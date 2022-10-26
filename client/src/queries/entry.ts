import {
  useInfiniteQuery,
  useQuery
} from "@tanstack/react-query"
import EntryService from "api/entry"

export const useEntriesPaginatedKey = "entries-paginated"
export const useEntriesPaginated = (userId?: string) => {
  return useInfiniteQuery(
    [useEntriesPaginatedKey, userId],
    EntryService.getPaginatedEntries,
    { getNextPageParam: (lastPage) => lastPage.meta.cursor }
  )
}


export const useEntriesByDatesKey = "entries-by-dates"
export const useEntriesByDates = (from: string, to: string, options?: Record<string, unknown>) => {
  return useQuery([useEntriesByDatesKey, { from, to }], () => EntryService.getEntriesByDates(from, to), options)
}


export const useEntriesStatsKey = 'entries-stats'
export const useEntriesStats = (userId?: string) => {
  return useQuery([useEntriesStatsKey, userId], () => EntryService.getEntriesStats(userId))
}

