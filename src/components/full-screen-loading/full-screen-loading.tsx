import React from 'react'
import clsx from 'clsx'

import { Panel, PanelProps, Loading } from '@/components'

import './full-screen-loading.less'

export interface FullScreenLoadingProps extends PanelProps {}

export const FullScreenLoading: React.FC<FullScreenLoadingProps> = ({ ...wrapProps }) => {
  wrapProps.className = clsx('full-screen-loading full-screen-min flex center', wrapProps.className)

  return (
    <Panel shadow {...wrapProps}>
      <div>
        <Loading />
      </div>
    </Panel>
  )
}
