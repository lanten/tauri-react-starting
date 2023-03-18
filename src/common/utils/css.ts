import { isDef } from './base'

export function mapInlineCssVars<T extends Record<string, any | undefined>>(
  obj?: T,
  group?: string
): Record<string, string> {
  const result: Record<string, string> = {}
  const prefix = '--' + (group ? `-${group}-` : '')

  for (const key in obj) {
    let val = obj[key] as any
    if (!isDef(val)) continue

    if (typeof val === 'number') {
      val = val + 'px'
    }

    result[`${prefix}${key}`] = val
  }

  return result
}
