import React from 'react'
import clsx from 'clsx'

import './titlebar-menu.less'

export interface TitlebarMenuProps extends ReactBaseType {}

export const TitlebarMenu: React.FC<TitlebarMenuProps> = ({ ...wrapProps }) => {
  wrapProps.className = clsx(wrapProps.className, 'titlebar-menu')

  return (
    <div {...wrapProps}>
      <p>component titlebar-menu is created</p>
    </div>
  )
}
