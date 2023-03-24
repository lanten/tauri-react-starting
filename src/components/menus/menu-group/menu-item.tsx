import React from 'react'
import clsx from 'clsx'

import { closeCurrentMenu } from '@/components'

import './menu-group.less'

export interface MenuItemProps extends ReactBaseType {
  autoCloseMenu?: boolean
  split?: boolean
  disabled?: boolean
  noHover?: boolean
  icon?: React.ReactNode
}

export const MenuItem: React.FC<MenuItemProps> = ({
  autoCloseMenu = true,
  icon,
  split,
  disabled,
  noHover,
  onClick,
  children,
  ...wrapProps
}) => {
  wrapProps.className = clsx(wrapProps.className, 'app-menu-item flex row center-v', {
    'border top-1 split': split,
    'no-hover': noHover,
    disabled,
  })

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (disabled) return

    if (autoCloseMenu) {
      closeCurrentMenu()
    }

    onClick?.(e)
  }

  let iconNode: React.ReactNode = null

  if (typeof icon === 'string') {
    iconNode = <i className={clsx('menu-icon iconfont', `icon-${icon}`)} />
  } else if (icon) {
    iconNode = icon
  }

  return (
    <div onClick={handleClick} {...wrapProps}>
      {iconNode}
      <div className="flex-1">{split ? null : children}</div>
    </div>
  )
}
