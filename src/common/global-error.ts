/**
 * 此文没有默认引用，在手动引用前不会生效
 */

/**
 * 全局JS异常捕获
 */
window.addEventListener('error', (e) => {
  $.logger.error(e.message, {
    filename: e.filename,
    lineno: e.lineno,
    colno: e.colno,
    type: e.type,
    stack: e.error?.stack,
  })
})

/**
 * 未处理的 Promise 异常
 */
window.addEventListener('unhandledrejection', (e) => {
  $.logger.error(e.reason.message || e.type, {
    type: e.type,
    stack: e.reason.stack,
  })
})

/**
 * 已处理的 Promise 异常
 */
// window.addEventListener('rejectionhandled', (e) => {
//   console.log('rejectionhandled', e)
// })
