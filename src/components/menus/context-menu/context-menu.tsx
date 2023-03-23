import React from 'react'
import clsx from 'clsx'

import { MenuGroup, MenuItem, type MenuPopupProps } from '@/components'

import './context-menu.less'

export interface ContextMenuProps extends MenuPopupProps {
  selectedText?: string
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ selectedText, target, onLoad, ...wrapProps }) => {
  React.useEffect(() => {}, [])

  wrapProps.className = clsx(wrapProps.className, 'app-context-menu')

  return (
    <div {...wrapProps}>
      <MenuGroup>
        <MenuItem icon="meh">Text</MenuItem>
        <MenuItem icon="attachment" disabled>
          Disabled
        </MenuItem>
        <MenuItem split />
        <MenuItem icon="copy">Copy</MenuItem>
        <MenuItem icon="cut">Cut</MenuItem>
      </MenuGroup>
    </div>
  )
}
