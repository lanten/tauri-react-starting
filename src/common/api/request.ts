import axios, { AxiosRequestConfig } from 'axios'

import { errorActionHandler } from './handle-response'

const DEFAULT_CONFIG: RequestOptions = {
  method: 'POST',
  baseURL: process.env.API_BASE,
  timeout: 60000, // 一分钟超时
  showLoading: false,
  errorType: 'notification',
  checkStatus: true,
  errorAction: true,
  formData: false,
  addTimeStamp: false,
  // withCredentials: true,
}

/** 发起一个请求 */
export async function request<T extends RequestRes>(
  path: string,
  params?: RequestParams,
  optionsSource?: RequestOptions
): Promise<T> {
  const options: RequestOptions = Object.assign(
    {},
    DEFAULT_CONFIG,
    optionsSource
  )
  const {
    method,
    checkStatus,
    formData,
    errorAction,
    headers = {},
    showLoading,
    addTimeStamp,
    ...axiosOptions
  } = options

  // const userToken = $.auth.getToken()

  // if (userToken) {
  //   headers.authorization = `Bearer ${userToken}`
  // }

  // 默认传递的参数
  const defaultParams = {}

  if (addTimeStamp) {
    defaultParams['t'] = Date.now()
  }

  const sendData: AxiosRequestConfig = {
    url: path,
    method,
    headers,
    ...axiosOptions,
  }

  const paramsData = Object.assign({}, defaultParams, params)

  if (method === 'GET') {
    const paramsStr = $.utils.toSearch(paramsData)
    sendData.url = sendData.url + paramsStr
  } else if (formData) {
    const formData = new FormData()
    Object.keys(paramsData).forEach((key) => {
      formData.append(key, paramsData[key])
    })
    sendData.data = formData
  } else {
    sendData.data = paramsData
  }

  // let closeLoading: undefined | (() => void)
  // if (showLoading) {
  //   closeLoading = message.loading('请稍候...', 0)
  // }

  return axios
    .request<T>(sendData)
    .then((res) => {
      const dataH = res.data
      if (!checkStatus || dataH.errorCode == 200) {
        return dataH
      } else {
        return Promise.reject(dataH)
      }
    })
    .catch((err: any) => {
      let errH = err
      if (err.isAxiosError && err.response?.data) {
        errH = parseResData(err.response?.data)
      }

      if (typeof err !== 'object') {
        errH = {
          message: err,
        }
      }

      if (errorAction) {
        errorActionHandler<T>(errH, sendData, options)
        return Promise.reject({ ...errH, path, sendData, resData: err })
      } else {
        return Promise.resolve(errH)
      }
    })
  // .finally(() => {
  //   closeLoading?.()
  // })
}

function parseResData<T>(resData: T) {
  return resData
}

// ------------------------------------------------------------------

declare global {
  /** 网络请求参数 */
  type RequestParams = Record<string, any>

  /** 网络请求返回值 */
  interface RequestRes {
    status: number
    /** 结果码:200成功 其他情况参考码表 */
    errorCode?: number
    /** 返回对象 */
    data?: any
    /** 返回消息 */
    message?: string
    /** 错误描述 */
    errorDetail?: Record<string, any>
  }

  /** 请求选项 */
  interface RequestOptions extends AxiosRequestConfig {
    /** 使用 formData 传递参数 */
    formData?: boolean
    /** 返回错误时是否执行 errorAction 默认: true */
    errorAction?: boolean
    /** 请求过程中是否显示 Loading */
    showLoading?: boolean
    /** 发生错误时提示框类型: 默认: toast */
    errorType?: 'toast' | 'modal' | 'notification' | false
    /** 是否校验请求状态 */
    checkStatus?: boolean
    errorModalTitle?: string
    addTimeStamp?: boolean
    codeMap?: Record<string, string>
  }
}
