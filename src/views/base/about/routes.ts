export const autoRoutes: RouteConfig[] = [
  {
    name: 'About',
    path: '/about',
    title: 'About',
    element: import('./about'),

    titlebar: {
      closable: true,
      maximizable: false,
      minimizable: false,
      alwaysOnTopButton: 'activated-hide',
    },

    createOptions: {
      width: 400,
      height: 300,
      resizable: false,
    },
  },
]
