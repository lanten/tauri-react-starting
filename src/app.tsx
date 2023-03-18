import React from 'react'

import { AppRouter } from '@/components'
import { useThemeMedia } from '@/hooks'

export default () => {
  const { theme } = useThemeMedia()

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return <AppRouter />
}
