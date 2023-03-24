import React from 'react'
import clsx from 'clsx'
import { appWindow } from '@tauri-apps/api/window'

import { openTitlebarMenu } from '@/components'
import { useGlobalStore } from '@/store'

import './app-titlebar.less'

export interface AppTitlebarProps extends ReactDivProps {
  /** 是否显示最小化按钮 */
  minimizable?: boolean
  /** 是否显示最大化按钮 */
  maximizable?: boolean
  /** 是否显示关闭按钮 */
  closable?: boolean
  /** 是否显示置顶按钮, 设为 'activated' 则默认为激活状态 */
  alwaysOnTopButton?: boolean | 'activated' | 'activated-hide'
}

export const AppTitlebar: React.FC<AppTitlebarProps> = ({
  minimizable = true,
  maximizable = true,
  closable = true,
  alwaysOnTopButton = false,
  ...wrapProps
}) => {
  const titleBarMenuRef = React.useRef<HTMLDivElement>(null)

  const { title } = useGlobalStore(['title'])

  const [maximized, setMaximized] = React.useState(false)
  const [alwaysOnTop, setAlwaysOnTop] = React.useState(false)

  wrapProps.className = clsx(wrapProps.className, 'app-titlebar flex center-v flex-none')

  React.useEffect(() => {
    if (['activated', 'activated-hide'].includes(alwaysOnTopButton as string)) {
      toggleAlwaysOnTop(true)
    } else if (!alwaysOnTopButton) {
      toggleAlwaysOnTop(false)
    }
  }, [alwaysOnTopButton])

  React.useEffect(() => {
    const toggleMaxListener = (e: any) => {
      if (e.detail === 2 && e?.target?.hasAttribute('data-tauri-drag-region') && e.buttons === 1) {
        e.preventDefault()
        e.stopImmediatePropagation()

        setMaximized(!maximized)
      }
    }
    document.addEventListener('mousedown', toggleMaxListener)
    return () => {
      document.removeEventListener('mousedown', toggleMaxListener)
    }
  }, [maximized])

  function toggleMaximize() {
    if (maximized) {
      appWindow.unmaximize().then(() => {
        setMaximized(false)
      })
    } else {
      appWindow.maximize().then(() => {
        setMaximized(true)
      })
    }
  }

  function toggleAlwaysOnTop(bool?: boolean) {
    if (bool === undefined) {
      bool = !alwaysOnTop
    }

    appWindow.setAlwaysOnTop(bool).then(() => {
      setAlwaysOnTop(bool!)
    })
  }

  return (
    <header {...wrapProps} data-tauri-drag-region>
      <div className="flex-1 title-content flex center-v" data-tauri-drag-region>
        <img src={$.images.APP_ICON_SVG} height="14" />
        <p className="title-text text-ellipsis fs-14 pr-sm pl-sm" data-tauri-drag-region title={title}>
          {title}
        </p>
      </div>

      <div className="titlebar-controller flex" data-tauri-drag-region>
        <div
          ref={titleBarMenuRef}
          className="titlebar-btn titlebar-menu-btn"
          title="菜单"
          onClick={() => {
            openTitlebarMenu({ target: titleBarMenuRef.current })
          }}
        >
          <i className="iconfont icon-arrow-down fs-14" />
        </div>

        {/* 置顶按钮 */}
        {[true, 'activated'].includes(alwaysOnTopButton) && (
          <div
            className={clsx('titlebar-btn always-on-top', { active: alwaysOnTop })}
            title="窗口置顶"
            onClick={() => toggleAlwaysOnTop()}
          >
            <i className="iconfont icon-pin fs-14" />
          </div>
        )}

        {/* 最小化按钮 */}
        {minimizable && (
          <div className="titlebar-btn" title="最小化" onClick={() => appWindow.minimize()}>
            <i className="iconfont icon-minus fs-16 mt-4" />
          </div>
        )}

        {/* 最大化按钮 */}
        {maximizable && (
          <div className="titlebar-btn" title={maximized ? '还原窗口' : '最大化'} onClick={toggleMaximize}>
            {maximized ? (
              <i className="iconfont icon-unmaximize fs-12" />
            ) : (
              <i className="iconfont icon-maximize fs-14" />
            )}
          </div>
        )}

        {/* 关闭按钮 */}
        {closable && (
          <div className="titlebar-btn titlebar-btn-close" title="关闭窗口" onClick={() => appWindow.close()}>
            <i className="iconfont icon-close fs-16 mr-2" />
          </div>
        )}
      </div>
    </header>
  )
}
