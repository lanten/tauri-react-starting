import { ContextMenu, type ContextMenuProps } from './context-menu'
import { openMenuPopup } from '../menu-popup'

export interface OpenAppContextMenuOptions extends ContextMenuProps {}

export async function openAppContextMenu(options?: OpenAppContextMenuOptions) {
  return openMenuPopup({
    children: <ContextMenu {...options} />,
    ...options,
  })
}
