import React from 'react'
import clsx from 'clsx'

import { MenuGroup, MenuItem } from '@/components'
import { useGlobalStore, dispatchGlobalStore, GlobalStoreState } from '@/store'

import './titlebar-menu.less'

export interface TitlebarMenuProps extends ReactBaseType {}

const themeConfig: {
  name: GlobalStoreState['theme']
  icon: string
  label: string
}[] = [
  {
    name: 'light',
    icon: 'sun',
    label: '亮色',
  },
  {
    name: 'dark',
    icon: 'moon',
    label: '暗色',
  },
  {
    name: 'system',
    icon: 'switch',
    label: '跟随系统',
  },
]
export const TitlebarMenu: React.FC<TitlebarMenuProps> = ({ ...wrapProps }) => {
  const { theme } = useGlobalStore(['theme'])

  wrapProps.className = clsx(wrapProps.className, 'titlebar-menu')

  return (
    <div {...wrapProps}>
      <MenuGroup>
        <MenuItem icon="theme" noHover autoCloseMenu={false}>
          <div className="flex row center-v">
            <div className="flex-1">
              <div>颜色主题</div>
              <div className="fs-12 color-gray">
                {
                  {
                    light: '亮色',
                    dark: '暗色',
                    system: '跟随系统',
                  }[theme]
                }
              </div>
            </div>

            <div className="flex row center-v gap-4 ml-12">
              {themeConfig.map((item) => (
                <button
                  key={item.name}
                  className={clsx('theme-btn', {
                    active: theme === item.name,
                  })}
                  onClick={() => {
                    localStorage.setItem('theme', item.name)
                    dispatchGlobalStore({ theme: item.name })
                  }}
                >
                  <i className={clsx('iconfont', `icon-${item.icon}`)} />
                </button>
              ))}
            </div>
          </div>
        </MenuItem>
      </MenuGroup>
    </div>
  )
}
