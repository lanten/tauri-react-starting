import React from 'react'
import clsx from 'clsx'

import { MenuPopup, type MenuPopupProps } from '@/components'

import './context-menu.less'

export interface ContextMenuProps extends MenuPopupProps {
  selectedText?: string
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ selectedText, target, onLoad, ...wrapProps }) => {
  React.useEffect(() => {}, [])

  wrapProps.className = clsx(wrapProps.className, 'app-context-menu')

  return (
    <div {...wrapProps}>
      context-menu!!!
      <div>{selectedText}</div>
    </div>
  )
}
