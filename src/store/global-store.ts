import { Store } from './store'

export interface GlobalStore {
  /** 当前所处路由 */
  currentRoute?: PageProps
  /** 页面标题 */
  title?: string
  /** 主题颜色，亮色 | 暗色 | 跟随系统 */
  theme: 'light' | 'dark' | 'system'
}

export const globalStore = new Store<GlobalStore>({
  currentRoute: undefined,
  title: process.env.APP_TITLE,
  theme: 'system',
})

export const useGlobalStore = globalStore.useStore.bind(globalStore)

export const dispatchGlobalStore = globalStore.dispatch.bind(globalStore)
