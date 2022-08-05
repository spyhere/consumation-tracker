export const QUERY_OPTIONS = {
  defaultOptions: {
    queries: {
      staleTime: 2.5 * 60 * 1000, // Refetch cached data in the background after 2.5 minutes
      cacheTime: 5 * 60 * 1000, // Cache is evicted after 5 minutes
      refetchOnWindowFocus: false, // Avoid refetching after regaining focus
    },
  }
}

// Customer
export const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFsaWNlIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNjU5NDM5OTYxfQ.io_ziy3PlypMofipMuc6UFyU_pCK4NgCR4V6_VS0Ca0"
// Admin
// export const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkJvYiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY1OTQ0MDAxMX0.j1jXq-DPqrrR_nQI60k79DVSKk_IHFFi_rQEXG0JsmU"
export const USER_TOKEN = "USER_TOKEN"

export const CALORIES_LIMIT = 500
export const MONEY_SPENT_LIMIT = 1000
