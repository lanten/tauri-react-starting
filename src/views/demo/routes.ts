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
]
