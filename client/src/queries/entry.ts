import {
  useInfiniteQuery,
  useQuery
} from "@tanstack/react-query"
import EntryService from "api/entry"

const useEntriesPaginatedKey = "entries-paginated"
const useEntriesPaginated = (userId?: string) => {
  return useInfiniteQuery(
    [useEntriesPaginatedKey, userId],
    EntryService.getPaginatedEntries,
    { getNextPageParam: (lastPage) => lastPage.meta.cursor }
  )
}

export {
  useEntriesPaginatedKey,
  useEntriesPaginated
}


const useEntriesByDatesKey = "entries-by-dates"
const useEntriesByDates = (from: string, to: string, options?: Record<string, unknown>) => {
  return useQuery([useEntriesByDatesKey, { from, to }], () => EntryService.getEntriesByDates(from, to), options)
}

export {
  useEntriesByDatesKey,
  useEntriesByDates
}


const useEntriesStatsKey = 'entries-stats'
const useEntriesStats = (userId?: string) => {
  return useQuery([useEntriesStatsKey], () => EntryService.getEntriesStats(userId))
}

export {
  useEntriesStatsKey,
  useEntriesStats
}
