import React from 'react'
import clsx from 'clsx'
import { CSSTransition } from 'react-transition-group'

import './menu-popup.less'

interface RectType {
  left?: number | string
  top?: number | string
  right?: number | string
  bottom?: number | string
  width?: number | string
  height?: number | string
}

const DEFAULT_RECT: RectType = {
  left: 0,
  top: 0,
}

export interface MenuPopupProps extends ReactBaseType {
  rect?: RectType
  /** 目标元素 */
  target?: EventTarget | HTMLElement | null
  /** 是否自动定位到目标元素 */
  autoPositionByTarget?: boolean
  /** 位置，仅自动定位时生效 */
  position?: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right'
  /** 动画类型 */
  animationType?: 'ac-fade' | 'ac-move' | 'ac-move-top'
  /** 动画持续时间 */
  duration?: number
  onLoad?: (target: HTMLDivElement | null) => void
  onClose?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const MenuPopup: React.FC<MenuPopupProps> = ({
  children,
  duration = 400,
  rect = DEFAULT_RECT,
  target,
  autoPositionByTarget = true,
  animationType = 'ac-move-top',
  position: positionType = 'bottom-left',
  onLoad,
  onClose,
  ...wrapProps
}) => {
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = React.useState(false)

  React.useEffect(() => {
    setRendered(true)
  }, [])

  wrapProps.className = clsx(wrapProps.className, 'app-menu-popup border rect-1')

  wrapProps.style = {
    ...$.utils.mapInlineCssVars({
      ...rect,
      'ac-animation-duration': `${duration}ms`,
      'ac-animation-timing-enter': 'var(--ac-animation-timing-fade-out)',
      'ac-animation-timing-leave': 'var(--ac-animation-timing-fade-out)',
    }),
    ...wrapProps.style,
  }

  function onEnter() {
    const wrapTarget = wrapRef.current
    if (!wrapTarget) return

    const bodyRect = document.body.getBoundingClientRect()
    let wrapRect = wrapTarget.getBoundingClientRect()
    const nextRect: RectType = { ...wrapRect }

    if (autoPositionByTarget && target) {
      const targetRect = (target as HTMLElement).getBoundingClientRect()

      switch (positionType) {
        case 'top-left':
          nextRect.left = targetRect.left
          nextRect.top = targetRect.top - wrapRect.height
          break

        case 'bottom-left':
          nextRect.top = targetRect.bottom
          nextRect.left = targetRect.left
          break

        case 'top-right':
          nextRect.top = targetRect.top - wrapRect.height
          nextRect.left = targetRect.right - wrapRect.width
          break

        case 'bottom-right':
          nextRect.top = targetRect.bottom
          nextRect.left = targetRect.right - wrapRect.width
          break
      }

      wrapTarget.style.left = nextRect.left ? nextRect.left + 'px' : 'unset'
      wrapTarget.style.top = nextRect.top ? nextRect.top + 'px' : 'unset'
      wrapTarget.style.right = nextRect.right ? nextRect.right + 'px' : 'unset'
      wrapTarget.style.bottom = nextRect.bottom ? nextRect.bottom + 'px' : 'unset'
    }

    wrapRect = wrapTarget.getBoundingClientRect()

    // 修正位置, 防止菜单超出屏幕
    if (wrapRect.left + wrapRect.width > bodyRect.width) {
      wrapTarget.style.left = 'unset'
      wrapTarget.style.right = '0'
    }

    if (wrapRect.top + wrapRect.height > bodyRect.height) {
      wrapTarget.style.top = 'unset'
      wrapTarget.style.bottom = '0'
    }

    onLoad?.(wrapRef.current)
  }

  return (
    <div
      className="app-menu-popup-background"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.(e)
        }
      }}
    >
      <CSSTransition in={rendered} timeout={duration} classNames={clsx(animationType)} unmountOnExit onEnter={onEnter}>
        <div {...wrapProps} ref={wrapRef}>
          {children}
        </div>
      </CSSTransition>
    </div>
  )
}
