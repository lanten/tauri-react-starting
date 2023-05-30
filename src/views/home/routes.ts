export const autoRoutes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    // redirectTo: '/sqlite-demo',
    element: import('./home'),
    titlebar: {
      alwaysOnTopButton: true,
      closeType: 'hide',
    },
  },
]
