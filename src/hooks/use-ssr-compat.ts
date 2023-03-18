import { useCallback, useEffect, useState } from 'react'

export function useSsrCompat() {
  const [mounted, setMounted] = useState(false)
  const [rendered, setRendered] = useState(mounted)

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    }, 1)
  }, [])

  useEffect(() => {
    if (mounted) {
      setRendered(true)
    }
  }, [mounted])

  const render = useCallback(
    (r: () => any) => {
      return mounted ? r() : null
    },
    [mounted]
  )

  return [render, rendered] as const
}
