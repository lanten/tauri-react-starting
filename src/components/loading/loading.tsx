import React from 'react'
import clsx from 'clsx'

import './loading.less'

export interface LoadingProps extends Omit<ReactBaseType, 'onClick'> {
  /** 大小 默认 34 */
  size?: number
  /** 颜色 */
  color?: string
  /** 旋转速度，x秒/圈 数值越小越快，默认0.8 */
  speed?: number
}

export const Loading: React.FC<LoadingProps> = ({ size = 34, color, speed = 0.8, ...wrapProps }) => {
  wrapProps.className = clsx('app-svg-loader', wrapProps.className)

  const r = size / 2 - 2

  return (
    <svg {...wrapProps} stroke={color} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".25" cx={r} cy={r} r={r} />
          <path d={`M${r * 2} ${r}c0-9.94-8.06-${r}-${r}-${r}`}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${r} ${r}`}
              to={`360 ${r} ${r}`}
              dur={`${speed}s`}
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  )
}
