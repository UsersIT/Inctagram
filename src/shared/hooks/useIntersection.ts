import { useCallback, useRef } from 'react'

export const useIntersection = <T extends HTMLElement>(
  cb: () => void,
  isLoading: boolean,
  hasMore: boolean
) => {
  const observer = useRef<IntersectionObserver | null>(null)

  const lastNodeRef = useCallback(
    (node: T) => {
      if (!node || isLoading) {
        return
      }

      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          cb()
        }
      })

      observer.current.observe(node)
    },
    [isLoading, hasMore, cb]
  )

  return lastNodeRef
}
