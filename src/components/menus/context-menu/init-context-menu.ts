import { openAppContextMenu } from '@/components'

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

    openAppContextMenu({
      target: e.target as HTMLElement,
      autoPositionByTarget: false,
      animationType: 'ac-move',
      selectedText: document.getSelection()?.toString(),
      rect: { left: x, top: y, width: 200, height: 200 },
    })
  }

  listenElement.addEventListener('contextmenu', openListener, { capture: true })

  return () => {
    listenElement.removeEventListener('contextmenu', openListener, { capture: true })
  }
}

/** 禁用 webview 默认右键菜单 */
document.addEventListener(
  'contextmenu',
  (e) => {
    e.preventDefault()
  },
  { capture: true }
)
