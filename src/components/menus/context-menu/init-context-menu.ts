import type { Root } from 'react-dom/client'
import { openAppContextMenu } from '@/components'

let currentContextMenu: Root | null = null

/**
 * 初始化右键菜单
 *
 * @param listenElement
 * @returns
 */
export function initContextMenu(listenElement: HTMLElement | null = document.body) {
  if (!listenElement) return

  async function openListener(e: MouseEvent) {
    e.preventDefault()

    let x = e.clientX
    let y = e.clientY

    closeContextMenu()

    currentContextMenu = await openAppContextMenu({
      target: e.target,
      selectedText: document.getSelection()?.toString(),
      rect: { left: x, top: y, width: 200, height: 200 },
      onLoad(target) {
        if (!target) return

        const contentRect = document.body.getBoundingClientRect()
        const targetRect = target.getBoundingClientRect()

        // 修正位置, 防止菜单超出屏幕
        if(targetRect.left + targetRect.width > contentRect.width) {
          target.style.left = 'unset'
          target.style.right = '0'
        }

        if(targetRect.top + targetRect.height > contentRect.height) {
          target.style.top = 'unset'
          target.style.bottom = '0'
        }
      },
    })
  }

  listenElement.addEventListener('contextmenu', openListener,{capture:true})
  document.addEventListener('click', closeContextMenu,{capture:true})

  return () => {
    listenElement.removeEventListener('contextmenu', openListener,{capture:true})
    document.removeEventListener('click', closeContextMenu,{capture:true})
  }
}

/** 关闭右键菜单 */
export function closeContextMenu() {
  if (!currentContextMenu) return

  currentContextMenu.unmount()
  currentContextMenu = null
}

/** 禁用 webview 默认右键菜单 */
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
},{capture:true})
