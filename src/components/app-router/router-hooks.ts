import { appWindow } from '@tauri-apps/api/window'
import { globalStore } from '@/store'

/** 路由钩子,页面切入时触发 */
export const beforeRouter: RouterHook = (props: PageProps) => {
  const nextProps = Object.assign({}, props)

  let { title = process.env.APP_TITLE } = props

  document.title = title
  appWindow.setTitle(title)

  globalStore.dispatch({ currentRoute: nextProps, title })
  $.logger.info('BeforeRouter', location.href, { props: nextProps })

  return true
}

/**
 * 跳转到错误页
 * @param props
 * @param nextProps
 */
export function toErrorPage(props: PageProps, nextProps: PageProps, code: ErrorPageStates['code']) {
  const errorStates: ErrorPageStates = {
    name: props.name,
    code: code,
    from: props.location.pathname,
  }

  nextProps.location.pathname = '/error'

  props.navigate(nextProps.location, { replace: true, state: errorStates })
  return false
}
