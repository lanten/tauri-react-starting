import type { Root } from 'react-dom/client'
import { MenuPopup, type MenuPopupProps } from './menu-popup'

export interface OpenMenuPopupOptions extends MenuPopupProps {}

declare global {
  interface Window {
    __currentMenu: Root | null
    __currentMenuTarget?: HTMLElement | EventTarget | null
    __closeCurrentMenu?: () => void
  }
}

window.__currentMenu = null
window.__closeCurrentMenu = closeCurrentMenu
// document.addEventListener('click', closeContextMenu, { capture: true })
window.addEventListener('resize', closeCurrentMenu)

/** 关闭菜单 */
export function closeCurrentMenu() {
  if (!window.__currentMenu) return

  if (window.__currentMenuTarget instanceof HTMLElement) {
    window.__currentMenuTarget.classList.remove('menu-focused')
  }

  window.__currentMenu.unmount()
  window.__currentMenu = null
  window.__currentMenuTarget = null
}

export async function openMenuPopup({ onClose, ...options }: OpenMenuPopupOptions = {}, id = 'app-menu-popup') {
  window.__currentMenuTarget = options.target

  if (window.__currentMenuTarget instanceof HTMLElement) {
    window.__currentMenuTarget.classList.add('menu-focused')
  }

  window.__currentMenu = await $.mountReactNode({
    content: (
      <MenuPopup
        {...options}
        onClose={(e) => {
          closeCurrentMenu()
          onClose?.(e)
        }}
      />
    ),
    containerId: id,
  })

  return window.__currentMenu
}
