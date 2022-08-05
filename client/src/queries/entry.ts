import {
  useInfiniteQuery,
  useQuery
} from "@tanstack/react-query"
import EntryService from "api/entry"

const useEntriesPaginatedKey = "entries-paginated"
const useEntriesPaginated = () => {
  return useInfiniteQuery(
    [useEntriesPaginatedKey],
    EntryService.getPaginatedEntries,
    { getNextPageParam: (lastPage) => lastPage.meta.cursor }
  )
}

export { useEntriesPaginatedKey, useEntriesPaginated }

const useEntriesStatsKey = 'entries-stats'
const useEntriesStats = () => {
  return useQuery([useEntriesStatsKey], () => EntryService.getEntriesStats())
}

export { useEntriesStatsKey, useEntriesStats }
