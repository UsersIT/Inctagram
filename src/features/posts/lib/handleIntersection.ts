export const handleIntersection = (
  entries: IntersectionObserverEntry[],
  setLoadingMore: (loading: boolean) => void,
  hasMorePosts: boolean,
  loadingMore: boolean
) => {
  if (entries[0].isIntersecting && !loadingMore && hasMorePosts) {
    setLoadingMore(true)
  }
}
