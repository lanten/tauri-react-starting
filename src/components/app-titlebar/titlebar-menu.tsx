import React from 'react'
import clsx from 'clsx'

export interface AppTitlebarProps {}

export const AppTitlebar: React.FC<AppTitlebarProps> = ({}) => {
  return (
    <div className={clsx('app-titlebar flex center-v')}>
      <div>{123}</div>
    </div>
  )
}
