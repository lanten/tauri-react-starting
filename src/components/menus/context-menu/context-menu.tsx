import React from 'react'
import clsx from 'clsx'
import { CSSTransition } from 'react-transition-group'

import { closeContextMenu } from '@/components'
import { useSsrCompat } from '@/hooks'

import './context-menu.less'

interface RectType {
  left?: number
  top?: number
  right?: number
  bottom?: number
  width?: number
  height?: number
}

export interface ContextMenuProps extends Omit<ReactDivProps, 'onLoad'> {
  rect?: RectType
  target?: EventTarget | null
  selectedText?: string
  duration?: number
  onLoad?: (target: HTMLDivElement | null) => void
}

const DEFAULT_RECT: RectType = {
  left: 0,
  top: 0,
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  duration = 400,
  rect = DEFAULT_RECT,
  selectedText,
  target,
  onLoad,
  ...wrapProps
}) => {
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = React.useState(false)

  React.useEffect(() => {
    setRendered(true)
  }, [])

  wrapProps.className = clsx(wrapProps.className, 'app-context-menu border rect-1')

  wrapProps.style = {
    ...$.utils.mapInlineCssVars({
      ...rect,
      'ac-animation-duration': `${duration}ms`,
      'ac-animation-timing-enter': 'var(--ac-animation-timing-fade-out)',
      'ac-animation-timing-leave': 'var(--ac-animation-timing-fade-out)',
    }),
    ...wrapProps.style,
  }

  wrapProps.onClick = (e) => {
    e.stopPropagation()
    console.log({ selectedText, target })
  }

  return (
    <CSSTransition
      in={rendered}
      timeout={duration}
      classNames="ac-move-fade"
      unmountOnExit
      onEnter={() => {
        onLoad?.(wrapRef.current)
      }}
    >
      <div {...wrapProps} ref={wrapRef}>
        {rendered} context-menu!!!
      </div>
    </CSSTransition>
  )
}
