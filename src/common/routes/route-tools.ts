/**
 * 解析路由路径
 *
 * @param path
 * @param params
 * @param query
 * @returns
 */
export function parseRoutePath(path: string, params?: Record<string, any>, query?: Record<string, any>) {
  let pathStr = path

  if (typeof params === 'object') {
    pathStr = path.replace(/\:([^\/]+)/g, (_, $1) => {
      return params[$1]
    })
  }

  if (typeof query === 'object') {
    pathStr += $.utils.toSearch(query)
  }

  return pathStr
}
