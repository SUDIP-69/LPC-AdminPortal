import { useEffect, useRef, useCallback, useState } from 'react'

interface UseInfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
  enabled?: boolean
}

export function useInfiniteScroll<T>(
  fetchMore: () => Promise<T[]>,
  options: UseInfiniteScrollOptions = {}
) {
  const {
    threshold = 0,
    rootMargin = '0px',
    enabled = true,
  } = options

  const [items, setItems] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const newItems = await fetchMore()
      setItems((prev) => [...prev, ...newItems])
      setHasMore(newItems.length > 0)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load more items'))
    } finally {
      setIsLoading(false)
    }
  }, [fetchMore, hasMore, isLoading])

  useEffect(() => {
    if (!enabled) return

    const element = loadingRef.current
    if (!element) return

    observer.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          loadMore()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.current.observe(element)

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [enabled, threshold, rootMargin, loadMore])

  return {
    items,
    isLoading,
    hasMore,
    error,
    loadingRef,
    loadMore,
  }
}

// Example usage:
/*
interface Post {
  id: number
  title: string
  content: string
}

function PostList() {
  const fetchPosts = async (): Promise<Post[]> => {
    // Simulate API call
    const response = await fetch(`/api/posts?page=${page}`)
    return response.json()
  }

  const {
    items: posts,
    isLoading,
    hasMore,
    error,
    loadingRef,
  } = useInfiniteScroll<Post>(fetchPosts, {
    threshold: 0.5,
    rootMargin: '100px',
  })

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {hasMore && <div ref={loadingRef}>Load more</div>}
    </div>
  )
}

// With pagination
function PaginatedList() {
  const [page, setPage] = useState(1)

  const fetchItems = async (): Promise<Item[]> => {
    const response = await fetch(`/api/items?page=${page}`)
    const data = await response.json()
    setPage((prev) => prev + 1)
    return data
  }

  const {
    items,
    isLoading,
    hasMore,
    loadingRef,
  } = useInfiniteScroll(fetchItems)

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      {isLoading && <div>Loading...</div>}
      {hasMore && <div ref={loadingRef}>Load more</div>}
    </div>
  )
}

// With search
function SearchableList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  const fetchItems = async (): Promise<Item[]> => {
    const response = await fetch(
      `/api/items?search=${searchTerm}&page=${page}`
    )
    const data = await response.json()
    setPage((prev) => prev + 1)
    return data
  }

  const {
    items,
    isLoading,
    hasMore,
    loadingRef,
    loadMore,
  } = useInfiniteScroll(fetchItems, {
    enabled: searchTerm.length > 0,
  })

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      {isLoading && <div>Loading...</div>}
      {hasMore && <div ref={loadingRef}>Load more</div>}
    </div>
  )
}
*/