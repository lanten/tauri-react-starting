/**
 *
 * 自动导入 views 文件夹下所有的 routes.tsx? (export.autoRoutes) 以生成路由
 *
 * 通过 `$.routes.routes` 获取全局路由对象
 */

/** 默认路由配置 */
export const DEFAULT_ROUTE_CONFIG: Partial<RouteConfig> = {
  // ...
}

/** 以 name 为 key 的路由 Map */
export const routes: Map<string, RouteConfig> = new Map()

const views = import.meta.glob('@/views/**/routes.(ts|tsx)', { eager: true })

Object.values(views).forEach((view: any) => {
  const conf: RouteConfig | RouteConfig[] = view.autoRoutes
  flatRoutes(conf)
})

function flatRoutes(routes: RouteConfig | RouteConfig[], parent?: RouteConfig) {
  const routesH = Array.isArray(routes) ? routes : [routes]

  routesH.forEach((conf) => {
    if (parent) {
      conf.parentNamePath = parent.parentNamePath ? parent.parentNamePath.concat(parent.name) : [parent.name]
      conf.parent = parent
    }

    if (Array.isArray(conf.routes) && conf.routes.length) {
      if (conf.path) {
        console.warn(`路由配置异常 [${conf.name}]：配有 routes 子路由的情况下不应存在 path 字段`)
      }
      flatRoutes(conf.routes, conf)
    }

    const assignConf = Object.assign({}, DEFAULT_ROUTE_CONFIG, conf)

    addRouteConfig(assignConf)
  })
}

/**
 * 添加一个路由
 * @param conf
 */
export function addRouteConfig(conf: RouteConfig) {
  if (conf.title) {
    conf.keywords = conf.keywords?.trim() || ''
  }

  routes.set(conf.name, conf)
}
