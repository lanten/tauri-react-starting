import { TitlebarMenu, type TitlebarMenuProps } from './titlebar-menu'
import { openMenuPopup, type OpenMenuPopupOptions } from '../menu-popup'

export interface OpenTitlebarMenu extends Omit<OpenMenuPopupOptions, 'children'> {
  props?: TitlebarMenuProps
}

export async function openTitlebarMenu({ props, ...options }: OpenTitlebarMenu = {}) {
  return openMenuPopup({
    children: <TitlebarMenu {...props} />,
    ...options,
  })
}
