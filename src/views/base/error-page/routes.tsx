export const autoRoutes: RouteConfig[] = [
  {
    name: 'ErrorPage',
    path: '*',
    title: '出错了',
    element: import('./error-page'),
  },
]
