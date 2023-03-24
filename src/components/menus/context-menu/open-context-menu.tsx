import { ContextMenu, type ContextMenuProps } from './context-menu'
import { openMenuPopup } from '../menu-popup'

export interface OpenAppContextMenuOptions extends ContextMenuProps {}

export async function openAppContextMenu({
  autoPositionByTarget,
  animationType,
  selectedText,
  ...options
}: OpenAppContextMenuOptions = {}) {
  return openMenuPopup({
    children: <ContextMenu selectedText={selectedText} {...options} />,
    autoPositionByTarget,
    animationType,
    ...options,
  })
}
