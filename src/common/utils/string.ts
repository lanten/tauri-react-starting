/** 复制文本至剪切板 */
export async function copyText(text: string) {
  const copyFn = navigator.clipboard?.writeText ? navigator.clipboard.writeText : copyTextToClipboard
  return copyFn(text).then(() => {
    // message.success('已复制到剪切板') // TODO
  })
}

/**
 * 复制文本至剪切板 (兼容方案)
 * @param text
 */
export function copyTextToClipboard(text: string) {
  return new Promise((resolve, reject) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed' // avoid scrolling to bottom
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand('copy')
      if (successful) {
        resolve(void 0)
      } else {
        reject()
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err)
    }

    document.body.removeChild(textArea)
  })
}

/**
 * 格式化金额 千分符
 * @param value
 * @param fixed
 */
export function formatAmount(value?: number | string, fixed = 2): string {
  const needFixed = fixed != null
  const num = Number(value || 0)
  if (isNaN(num)) {
    return needFixed ? (0).toFixed(fixed) : '0'
  }

  const str = needFixed ? num.toFixed(fixed) : num.toString()
  const arr = str.split('.')

  let result = arr[0] ? arr[0].replace(/(?=(?!\b)(\d{3})+$)/g, ',') : '0'
  if (arr[1] != null) {
    result += `.${arr[1]}`
  }

  return result
}

/**
 * 生成一组随机 ID
 * @param 格式, x 为随机字符
 */
export function uuid(t = 'id-xxxxx'): string {
  return t.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
