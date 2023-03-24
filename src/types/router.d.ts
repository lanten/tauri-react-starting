import type { RouteProps, Location, NavigateFunction } from 'react-router-dom'
import type { NavigateFunctionCustom } from '@/common/routes/navigation'
import type { AppTitlebarProps } from '@/components'
import type { CreateOptions } from '@/common/window'

declare global {
  type RouteNames = 'Home' | 'Demo' | 'PageParams' | 'ErrorPage' | 'About' | 'IconfontDemo'

  /** 页面默认 props */
  interface PageProps<P = Record<string, unknown>, Q = Record<string, unknown>, LocationState = unknown>
    extends RouteContextType<Q, P, LocationState>,
      RouteOptions {}

  interface RouteLocation<S = unknown> extends Location {
    state: S
  }

  interface RouteContextType<Q = Record<string, unknown>, P = Record<string, unknown>, S = unknown> {
    /** 由 location.search 转换来的对象 */
    query: Q
    /** react-router location 对象 */
    location: RouteLocation<S>
    /** react-router 路由跳转方法 */
    navigate: NavigateFunction
    /** 改良后的路由跳转方法, 支持传入 name 跳转 */
    navigateTo: NavigateFunctionCustom
    /** 路由参数 */
    params: P
  }

  interface NavbarProps {}

  /** 自定义路由参数 */
  interface RouteOptions {
    /** 路由的 name,全局唯一 */
    name: RouteNames
    /** 是否静态 */
    isStatic?: boolean
    /** 页面标题 */
    title?: string
    /** 窗口创建 相关选项 */
    createOptions?: Omit<CreateOptions, 'name' | 'title'>
    /** 自定义参数, 视情况而定 */
    type?: string
    /** 路由容器 props */
    contentProps?: ReactDivProps
    /** 是否启用右键菜单 */
    useContextMenu?: boolean
    /** 窗口标题控制 */
    titlebar?: boolean | AppTitlebarProps
    /** 关键字 用于检索 */
    // keywords?: string[]
  }

  interface RouteConfig extends Omit<RouteProps, 'children'>, RouteOptions {
    path?: string
    element?: Promise<any> | RouteProps['element']
    /** 重定向 */
    redirectTo?: string
    /**
     * 子路由
     * 子路由 path 与父级不存在嵌套关系
     */
    routes?: RouteConfig[]
    /**
     * 父级路由
     * auto-routes 会根据 RouteConfig 层级自动注入，无需手动声明
     */
    parent?: RouteConfig
    /**
     * 嵌套层级路径，路由 name 的数组
     * 用明确路由嵌套层级
     * auto-routes 会根据 RouteConfig 层级自动注入，无需手动声明
     */
    parentNamePath?: string[]
  }

  type RouterHook = (props: PageProps, next: () => void) => boolean | void | Promise<boolean | void>

  interface RouteStatic<P = any, R = any> {
    beforeRouter?: (props: P) => Promise<R>
  }
}
