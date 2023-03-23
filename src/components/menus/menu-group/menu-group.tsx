import React from 'react'
import clsx from 'clsx'
import { MenuItem, type MenuItemProps } from './menu-item'

import './menu-group.less'

export interface MenuGroupProps extends ReactBaseType {
  items?: MenuItemProps[]
}

export const MenuGroup: React.FC<MenuGroupProps> = ({ children, items, ...wrapProps }) => {
  wrapProps.className = clsx(wrapProps.className, 'app-menu-group flex col')

  return (
    <div {...wrapProps}>
      {children}
      {items?.map((item, index) => {
        return <MenuItem key={index} {...item} />
      })}
    </div>
  )
}
