export const QUERY_OPTIONS = {
  defaultOptions: {
    queries: {
      staleTime: 2.5 * 60 * 1000, // Refetch cached data in the background after 2.5 minutes
      cacheTime: 5 * 60 * 1000, // Cache is evicted after 5 minutes
      refetchOnWindowFocus: false, // Avoid refetching after regaining focus
    },
  }
}

export const USER_TOKEN = "USER_TOKEN"

export const CALORIES_LIMIT = 500
