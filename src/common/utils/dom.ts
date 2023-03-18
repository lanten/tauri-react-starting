/**
 * 通过插入标签加载 js/css 文件
 *
 * @param {String} url 需要载入的 js/css url
 * @param {String} name 文件载入后挂载到 window 下的变量名
 * @param {String} type 文件类型 默认取后缀名
 */
export function asyncRequire<T = any>(url: string, name?: string, type?: 'js' | 'css'): Promise<T> {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName('head')[0] || document.body
    const filePath = url.split('?')[0]
    const ext = filePath.substring(filePath.lastIndexOf('.') + 1)

    if (document.getElementById(`async-require-${name || 'unknown'}`)) {
      return resolve(name && window[name])
    }

    let element: HTMLScriptElement | HTMLLinkElement
    if (ext == 'js' || type == 'js') {
      element = document.createElement('script')
      element.src = url
      element.onload = (e) => resolve(name ? window[name] : e)
    } else if (ext == 'css' || type == 'css') {
      element = document.createElement('link')
      element.rel = 'stylesheet'
      element.type = 'text/css'
      element.href = url
      element.onload = () => {
        if (!name) return resolve(undefined as any)
        if (window[name]) {
          resolve(window[name])
        } else {
          setTimeout(() => {
            resolve(name ? window[name] : 'timeout')
          }, 200)
        }
      }
    } else {
      return console.warn('Not: [js | css]')
    }

    element.id = `async-require-${name}`
    element.onerror = reject
    head.appendChild(element)
  })
}
