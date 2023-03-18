import React from 'react'

import { FullScreenLoading } from '@/components'

interface AsyncImportProps extends PageProps {
  element: Promise<any>
  hook?: RouterHook
}

/** 异步导入组件 */
export const AsyncImport: React.FC<AsyncImportProps> = ({ element, hook, ...props }) => {
  const [lazyElement, setLazyElement] = React.useState<React.ReactElement | null>(null)

  React.useEffect(() => {
    /// 非静态路由重置组件
    if (!props.isStatic) setLazyElement(<FullScreenLoading />)

    element?.then(({ default: Page }) => {
      const next = async (addProps?: any) => {
        let beforeRouterRes

        // 组件私有 beforeRouter 钩子
        if (Page?.beforeRouter) {
          beforeRouterRes = await Page.beforeRouter(props).catch(() => void 0)
        }

        setLazyElement(<Page {...props} {...beforeRouterRes} />)
      }

      // 全局 beforeRouter 钩子
      if (hook) {
        const hookRes = hook(props || {}, next)
        if (typeof hookRes === 'boolean' && hookRes) {
          next()
        }
      } else {
        next()
      }
    })
  }, [element, props.isStatic ? void 0 : props.location.key])

  return lazyElement
}
