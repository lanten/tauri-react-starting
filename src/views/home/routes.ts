export const autoRoutes: RouteConfig[] = [
  {
    name: 'Home',
    element: import('./home'),
    path: '/',
    titlebar: {
      alwaysOnTopButton: true,
    },
  },
]
