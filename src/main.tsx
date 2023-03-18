import { appWindow } from '@tauri-apps/api/window'

import { initSystemInfo } from '@/common/system-info'

import App from './app'

import './styles/index.less'

initSystemInfo().then((systemInfo) => {
  document.body.dataset.platform = systemInfo.osPlatform

  $.mountReactNode({ content: <App />, containerId: 'root' }).then(() => {
    appWindow.isVisible().then((isVisible) => {
      if (!isVisible) {
        appWindow.show()
      }
    })
  })
})
