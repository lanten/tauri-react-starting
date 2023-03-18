import { deleteProperty } from './object'

/** 获取 url 参数 */
export function getQuery(search = window.location.search) {
  const query: Record<string, any> = {}

  const searchH = search[0] === '?' ? search.substr(1) : search

  searchH.split('&').forEach((str) => {
    const strArr = str.split('=')
    const key = strArr[0]

    if (!key) return

    const val = decodeURIComponent(strArr[1])
    // try {
    //   val = JSON.parse(val)
    // } catch (err) {}
    query[key] = val
  })
  return query
}

/** 转换成 url search */
export function toSearch<T extends object>(obj: T, hasQuestionMark = true) {
  const arr = Object.keys(obj).map((key) => {
    let val = obj[key]

    if (typeof val !== 'string') {
      try {
        val = JSON.stringify(val)
      } catch (err) {
        console.error(err)
      }
    }

    return `${key}=${encodeURIComponent(val)}`
  })
  return (hasQuestionMark ? '?' : '') + arr.join('&')
}

export function replaceQuery<T extends Record<string, any>>(nextQuery: T) {
  const query = getQuery()
  const uri = `${location.origin}${location.pathname}${toSearch(deleteProperty({ ...query, ...nextQuery }))}`
  window.history.replaceState({}, document.title, uri)
}
