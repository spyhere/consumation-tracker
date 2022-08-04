import { useQuery } from "@tanstack/react-query"
import EntryService from "api/entry"

const useEntriesPaginatedKey = "entries-paginated"
const useEntriesPaginated = (cursor?: number, userId?: number) => {
  return useQuery(
    [useEntriesPaginatedKey, { cursor, userId }],
    () => EntryService.getPaginatedEntries(cursor, userId)
  )
}

export { useEntriesPaginatedKey, useEntriesPaginated }

const useEntriesStatsKey = 'entries-stats'
const useEntriesStats = () => {
  return useQuery([useEntriesStatsKey], () => EntryService.getEntriesStats())
}

export { useEntriesStatsKey, useEntriesStats }
