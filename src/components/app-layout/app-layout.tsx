import React from 'react'
import clsx from 'clsx'

import { AppTitlebar, initContextMenu } from '@/components'
import { globalStore } from '@/store'

import './app-layout.less'

export interface AppLayoutProps extends ReactDivProps {
  contentProps?: Omit<ReactDivProps, 'ref' | 'onLoad'>
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, contentProps = {}, ...layoutProps }) => {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const { currentRoute } = globalStore.useStore(['currentRoute'])
  const { name, titlebar, useContextMenu } = currentRoute || {}

  layoutProps['data-route'] = name
  layoutProps.className = clsx(layoutProps.className, 'app-layout flex column theme-light')

  React.useEffect(() => {
    let unlisten: Function | undefined = undefined

    if (useContextMenu) {
      unlisten = initContextMenu(contentRef.current)
    }

    return () => {
      unlisten?.()
    }
  }, [useContextMenu])

  function renderTitlebar() {
    if (titlebar === false) return null
    const titlebarProps = typeof titlebar === 'object' ? titlebar : {}
    return <AppTitlebar {...titlebarProps} />
  }

  return (
    <div {...layoutProps}>
      {renderTitlebar()}
      <div ref={contentRef} {...contentProps}>
        {children}
      </div>
    </div>
  )
}
