// import { message as Message, Modal, notification, Button, Input, Alert } from 'antd'

/**
 * 各种错误处理
 * @param err
 * @param sendData
 * @param options
 */
export function errorActionHandler<T extends RequestRes>(
  err: T,
  sendData: any,
  options: RequestOptions
) {
  const { message, errorCode } = err
  const { errorType } = options

  switch (errorCode) {
    // 未登录/登录超时
    case 401: {
      console.warn('未登录!')
      break
    }

    default: {
      showErrorMessage(
        errorType,
        message || '',
        errorCode || 'unknown',
        err,
        sendData
      )
      break
    }
  }
}

/** 显示错误消息 */
export function showErrorMessage(
  errorType: RequestOptions['errorType'],
  message: string,
  code: string | number,
  err: Record<string, any>,
  sendData: RequestOptions
) {
  switch (errorType) {
    case 'modal':
      // Modal.error({ title: '接口错误', content: `[${code}]: ${message}` })
      break

    default:
      // Message.error(`[${code}]: ${message}`)
      break
  }
}
