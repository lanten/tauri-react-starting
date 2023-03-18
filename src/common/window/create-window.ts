export interface CreateInvokeOptions {
  /** 窗口标识，默认使用路由 name, 如未传入 name, 则默认一个随机 id */
  label: string
  /** webview url */
  url: string
  /** 是否可见 */
  visible: boolean
  /** 窗口宽度 */
  width: number
  /** 窗口高度 */
  height: number
  /** 是否居中 */
  center: boolean
  /** 是否可缩放 */
  resizable: boolean
  /** 是否透明 */
  transparent: boolean
  /** 是否显示标题栏 */
  decorations: boolean
  /** 窗口标题 */
  title: string
  /** 模糊背景 */
  blur: boolean
  /** 显示窗口阴影，win 11 下附加圆角，仅在透明窗口下生效 */
  shadow: boolean
}

export interface CreateOptions<P = Record<string, any>, Q = Record<string, any>> extends Partial<CreateInvokeOptions> {
  /** 路由 name */
  name?: RouteNames
  params?: P
  query?: Q
}

const CREATE_WINDOW_DEFAULT_OPTIONS: CreateInvokeOptions = {
  label: '',
  url: '/',
  visible: false,
  width: 800,
  height: 600,
  center: true,
  resizable: true,
  transparent: true,
  decorations: false,
  title: process.env.APP_TITLE,
  blur: true,
  shadow: true,
}

/**
 * 创建一个新窗口，如果窗口标识已存在，则激活该窗口
 *
 * @param options 传入 invoke 时全字段必填
 */
export async function createWindow<P extends Record<string, any>, Q extends Record<string, any>>(
  createOptions: CreateOptions['name'] | CreateOptions<P, Q>
) {
  const optionsObj = typeof createOptions === 'object' ? createOptions : { name: createOptions }
  const options = Object.assign({}, CREATE_WINDOW_DEFAULT_OPTIONS, optionsObj)

  if (!options.label) {
    options.label = options.name || $.utils.uuid('win-xxxxxx')
  }

  if (options.name) {
    const routeConf = $.routes.get(options.name)

    if (routeConf) {
      if (routeConf.createOptions) {
        Object.assign(options, routeConf.createOptions, optionsObj)
      }

      options.title = routeConf.title || routeConf.name
      options.url = $.routeTools.parseRoutePath(routeConf.path!, options.params, options.query)
    }
  }

  console.log(options)

  return $.invoke('open_window', options)
}
