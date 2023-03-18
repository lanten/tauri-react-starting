/**
 * Array.prototype.includes 扩展
 * 搜索内容支持数组和函数
 *
 * @param srcArr
 * @param search
 * @returns
 */
export function includes<T>(srcArr: T[], search: T | T[] | ((v: T) => boolean)): boolean {
  if (Array.isArray(search)) {
    for (let i1 = 0; i1 < srcArr.length; i1++) {
      const v1 = srcArr[i1]
      for (let i2 = 0; i2 < search.length; i2++) {
        const v2 = search[i2]
        if (v1 === v2) return true
      }
    }
    return false
  } else if (search instanceof Function) {
    for (let i1 = 0; i1 < srcArr.length; i1++) {
      const v1 = srcArr[i1]
      if (search(v1) === true) return true
    }
    return false
  } else {
    return srcArr.includes(search)
  }
}

/**
 * 对象数组合并去重
 * @param key
 * @param args
 * @returns
 */
export function arrayZip<T>(key: keyof T, ...args: T[][]) {
  const arr1Map: { [k: string]: number } = {}
  return args.flat().filter((x) => {
    const k = (x?.[key] || '') + ''
    if (arr1Map[k]) {
      return false
    } else {
      arr1Map[k] = 1
      return true
    }
  })
}

/**
 * 删除指定值的属性
 * @param obj
 * @param {any[]} [v = [undefined, null, '']]
 * @returns
 */
export function deleteProperty<T>(obj: T, v: any = [undefined, null, '']): T {
  const res = {} as T
  const isArray = Array.isArray(v)
  for (const key in obj) {
    if (isArray) {
      if (!v.includes(obj[key])) res[key as string] = obj[key]
    } else {
      if (obj[key] !== v) res[key as string] = obj[key]
    }
  }
  return res
}
