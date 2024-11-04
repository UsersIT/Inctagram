import { useEffect, useRef } from 'react'

export const useInfiniteScroll = (callback: Function) => {
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (observer.current) {
      observer.current = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              callback()
            }
          })
        },
        { threshold: 1.0 }
      )
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [callback])

  return (element: HTMLElement | null) => {
    if (observer.current) {
      observer.current.disconnect()
    }

    if (element && observer.current) {
      observer.current.observe(element)
    }
  }
}
