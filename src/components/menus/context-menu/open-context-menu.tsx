import { ContextMenu, type ContextMenuProps } from './context-menu'

export interface OpenAppContextMenu extends ContextMenuProps {}

export async function openAppContextMenu(options?: OpenAppContextMenu) {
  return $.mountReactNode({
    content: <ContextMenu {...options} />,
    containerId: $.utils.uuid('ctx-menu-xxxxxx'),
    // containerId: 'app-context-menu',
  })
}
