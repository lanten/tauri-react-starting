export const autoRoutes: RouteConfig[] = [
  {
    name: 'Demo',
    title: 'Demo',
    path: '/demo',
    element: import('./demo'),
    useContextMenu: true,
  },

  {
    name: 'PageParams',
    title: 'PageParams',
    path: '/page-params/:param1/:param2',
    element: import('./page-params'),
    useContextMenu: true,
  },

  {
    name: 'IconfontDemo',
    title: 'Iconfont Demo',
    path: '/iconfont-demo',
    element: import('./iconfont-demo'),
  },

  {
    name: 'SqliteDemo',
    title: 'Sqlite Demo',
    path: '/sqlite-demo',
    element: import('./sqlite'),
  },
]
