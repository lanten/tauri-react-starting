import type { NavigateOptions, NavigateFunction, To } from 'react-router-dom'

import { routes } from './auto-routes'

interface ExNavigateOptions<P = any> extends NavigateOptions {
  /** 路由参数 */
  params?: P
}

export interface NavigateFunctionCustom<P = any> extends NavigateFunction {
  (to: RouteNames & string, options?: ExNavigateOptions<P>): void
  (delta: number): void
}

// 防止 dev-server hot-load 时函数被重置
if (!window.__TEMP_navigateTo) {
  window.__TEMP_navigateTo = () => console.error('navigateTo: function not load')
}

/** react-router 路由跳转方法 (全局) */
export let navigateTo: NavigateFunctionCustom = window.__TEMP_navigateTo

/** 初始化路由跳转方法 */
export function initNavigateFunction(fn: NavigateFunctionCustom) {
  window.__TEMP_navigateTo = createNavigateFunction(fn)
  navigateTo = window.__TEMP_navigateTo
  return navigateTo
}

/** 改良 NavigateFunction */
export function createNavigateFunction<P = any>(fn: NavigateFunctionCustom<P>) {
  return ((to: string, options: NavigateOptions & ExNavigateOptions<P>) => {
    let toPath = to

    if (typeof toPath === 'string' && toPath[0] !== '/') {
      const route = routes.get(toPath)

      if (route && route.path) {
        toPath = route.path as RouteNames
      }
    }

    options?.replace

    if (typeof options?.params === 'object') {
      for (const key in options.params) {
        const val = (options.params[key] || '') as string
        toPath = toPath.replace(`:${key}`, val)
      }
    }

    fn(toPath, options)
  }) as NavigateFunctionCustom
}

declare global {
  interface Window {
    __TEMP_navigateTo: NavigateFunctionCustom
  }
}
