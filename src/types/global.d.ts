import * as common from '@/common'

declare global {
  const $: typeof common

  type ReactDivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

  type ReactBaseType = Pick<ReactDivProps, 'id' | 'children' | 'className' | 'style' | 'onClick' | 'onLoad'>

  /** 获取 Promise 返回值 */
  type AwaitedResult<T> = T extends Promise<infer U> ? U : never

  /** 获取 Promise 返回值 (递归) */
  type AwaitedDeep<T> = T extends Promise<infer U> ? (U extends Promise<unknown> ? Awaited<U> : U) : never

  interface Window {}

  interface Storage {}

  namespace NodeJS {}
}
