/**
 * 格式化日期
 * @param date
 * @param format 'YYYY-MM-DD HH:mm:ss.ms'
 */
export function formatDate(date: Date = new Date(), format = 'YYYY-MM-DD HH:mm:ss.ms') {
  const obj = {
    YYYY: () => date.getFullYear().toString().padStart(4, '0'),
    MM: () => (date.getMonth() + 1).toString().padStart(2, '0'),
    DD: () => date.getDate().toString().padStart(2, '0'),
    HH: () => date.getHours().toString().padStart(2, '0'),
    mm: () => date.getMinutes().toString().padStart(2, '0'),
    ss: () => date.getSeconds().toString().padStart(2, '0'),
    ms: () => date.getMilliseconds().toString().padStart(3, '0'),
  }

  return format.replace(/(YYYY|MM|DD|HH|mm|ss|ms)/g, (_, $1) => {
    return obj[$1]()
  })
}

/**
 * 将毫秒数格式化为时间，通常用于倒计时
 * @param time 毫秒
 * @param format
 * @returns
 */
export function formatTime(time: number, format = 'DD{天}HH{时}mm{分}ss{秒}') {
  const obj = {
    ms: () => time % 1000,
    ss: () => Math.floor(time / 1000) % 60,
    mm: () => Math.floor(time / 1000 / 60) % 60,
    HH: () => Math.floor(time / 1000 / 60 / 60) % 24,
    DD: () => Math.floor(time / 1000 / 60 / 60 / 24),
  }

  return format.replace(/(ms|ss|mm|HH|DD)\{(.+?)\}/g, (_, $1, $2) => {
    const val = obj[$1]
    if (!val) return ''
    const valH = val()
    if (!valH) return ''
    return `${valH}${$2}`
  })
}
