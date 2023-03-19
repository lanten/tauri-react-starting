import React from 'react'
import clsx from 'clsx'

import './panel.less'

export interface PanelProps extends ReactBaseType {
  shadow?: boolean
  hoverable?: boolean
  bordered?: boolean
  title?: string
  titleRightNode?: React.ReactNode
}

export const Panel: React.FC<PanelProps> = ({
  shadow,
  children,
  hoverable,
  bordered,
  title,
  titleRightNode,
  ...wrapProps
}) => {
  wrapProps.className = clsx(wrapProps.className, 'gp-panel br-md p-md', {
    'shadow-lg': shadow,
    hoverable,
    bordered,
    'pt-0': !!title,
  })

  return (
    <div {...wrapProps}>
      {title ? (
        <div className="pb-12 pt-12 mb-md panel-title flex row center-v border-bottom">
          <h3 className="color-default fs-16 flex-1">{title}</h3>
          {titleRightNode}
        </div>
      ) : null}
      {children}
    </div>
  )
}
