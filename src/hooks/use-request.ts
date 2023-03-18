/**
 * @module hooks/use-request 网络请求 hook
 *
 */

import { useState } from 'react'

type GetValues<T extends { [key: string]: any }> = T[keyof T]
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

type ApiListType = Omit<typeof $.api, 'request'>
type APiListFNListType = UnionToIntersection<GetValues<ApiListType>>
export type APiListFN = APiListFNListType[keyof APiListFNListType] | (() => Promise<any>)
type ApiPromiseRes<APiFN extends APiListFN> = Awaited<ReturnType<APiFN>>

interface RequestErrorType<SendData = Record<string, unknown>, ResData = Partial<RequestRes>> {
  path: string
  sendData: SendData
  resData: ResData & RequestRes
}

export interface UseRequestReturnType<ApiFN extends APiListFN> {
  /** 请求状态 */
  loading: boolean
  /** 错误信息 */
  error: RequestErrorType<Parameters<ApiFN>[0], ApiPromiseRes<ApiFN>>
  /** 返回数据 */
  data: ApiPromiseRes<ApiFN>
  /** 重新发起请求 */
  update: (...requestPrams: Parameters<ApiFN>) => Promise<ApiPromiseRes<ApiFN>>
  /** 重新发起请求 不设置loading状态 */
  updateNoLoading: (...requestPrams: Parameters<ApiFN>) => Promise<ApiPromiseRes<ApiFN>>
  /** 手动更新数据 */
  updateData: React.Dispatch<React.SetStateAction<Awaited<ReturnType<ApiFN>>>>
}

/**
 * Request Hook
 * $.api 的 Hooks 封装
 *
 * @param apiFN [$api.handlers](../api/handlers/index.ts) 中的API名称
 * @param defaultData 默认值
 * @param initLoading 初始化 loading 状态
 */
export function useRequest<ApiFN extends APiListFN>(
  apiFN: ApiFN,
  defaultData: any = {},
  initLoading = false
): UseRequestReturnType<ApiFN> {
  const [loading, setLoading] = useState(initLoading)
  const [data, setData] = useState<any>(defaultData) as [
    ApiPromiseRes<ApiFN>,
    React.Dispatch<React.SetStateAction<ApiPromiseRes<ApiFN>>>
  ]
  const [error, setError] = useState<any>()

  type ReturnPromise = Promise<ApiPromiseRes<ApiFN>>

  /**
   * 发起请求
   * @param requestParams
   * @returns
   */
  async function requestFn(showLoading: boolean, ...requestParams: Parameters<ApiFN>): ReturnPromise {
    if (showLoading) setLoading(true)
    return (apiFN as unknown as (...requestParams: Parameters<ApiFN>) => ReturnPromise)(...requestParams)
      ?.then((res) => {
        setData(res)
        return Promise.resolve(res)
      })
      ?.catch((err) => {
        setError(err)
        return Promise.reject(err)
      })
      ?.finally(() => {
        if (showLoading) {
          setLoading(false)
        }
      })
  }

  return {
    update: (...params: Parameters<ApiFN>) => requestFn(true, ...params),
    updateNoLoading: (...params: Parameters<ApiFN>) => requestFn(false, ...params),
    loading,
    error,
    data,
    updateData: setData,
  }
}
