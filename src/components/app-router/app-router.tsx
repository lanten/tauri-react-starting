import React from 'react'
import clsx from 'clsx'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  RouteProps,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom'

import { RouteContext } from '@/context'
import { AppLayout } from '@/components'
import { AsyncImport } from '@/components/async-import'
import { beforeRouter } from './router-hooks'

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>{createRoutes()}</Routes>
    </Router>
  )
}

/**
 * 创建路由列表
 * @param routes
 * @returns
 */
function createRoutes() {
  const res: JSX.Element[] = []
  let noMatch: JSX.Element | undefined = undefined

  $.routes.forEach((conf) => {
    const routeEl = createRouteItem(conf)

    if (conf.path === '*') {
      noMatch = routeEl
    } else {
      res.push(routeEl)
    }
  })

  if (noMatch) res.push(noMatch)

  return res
}

/**
 * 创建路由元素
 * @param routeConfig
 * @param key
 * @returns
 */
function createRouteItem(routeConfig: RouteConfig) {
  const { name, path, redirectTo, element, ...params } = routeConfig

  const routeProps: RouteProps = {
    path,
  }

  const nextProps = {
    name,
    ...params,
  }

  if (!element || redirectTo) {
    routeProps.element = <Navigate to={redirectTo || '/'} {...nextProps} />
  } else if (element instanceof Promise) {
    routeProps.element = (
      <RouteCtx>
        {(routeHooksParams) => {
          const contentProps: ReactDivProps = {
            ...nextProps.contentProps,
            id: 'app-content',
            className: clsx('app-content flex-1', nextProps.contentProps?.className),
          }
          return (
            <AppLayout data-env={process.env.BUILD_ENV} contentProps={contentProps}>
              <AsyncImport {...routeHooksParams} element={element} hook={beforeRouter} {...nextProps} />
            </AppLayout>
          )
        }}
      </RouteCtx>
    )
  } else {
    throw new Error(`Route config error! \n ${JSON.stringify(routeConfig, undefined, 2)}`)
  }

  return <Route key={name} {...routeProps} />
}

interface RouterContextProps {
  children: (props: RouteContextType) => React.ReactNode
}

function RouteCtx({ children }: RouterContextProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const query = Object.assign($.utils.getQuery(window.location.search), $.utils.getQuery(location.search))

  const ctxValue: RouteContextType = {
    location,
    navigate,
    query,
    params,
    navigateTo: $.navigation.initNavigateFunction(navigate),
  }

  return <RouteContext.Provider value={ctxValue}>{children(ctxValue)}</RouteContext.Provider>
}
