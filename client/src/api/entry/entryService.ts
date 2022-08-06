import apiClient from "../apiClient"
import {
  DayT,
  EntryBodyT
} from "./types"
import { QueryFunctionContext } from "@tanstack/react-query"

export type entriesPaginatedT = {
  data: {
    dates: DayT[]
  }
  meta: {
    cursor: number
  }
}
export const getPaginatedEntries = ({ queryKey, pageParam }: QueryFunctionContext): Promise<entriesPaginatedT> => {
  const userId = queryKey[1]
  const adminPrefix = userId ? `admin/users/${userId}` : ""
  return apiClient.get(adminPrefix + `/entries?cursor=${pageParam || ""}`)
    .then((response) => response.data)
}



export const getEntriesByDates = (from: string, to: string): Promise<Omit<entriesPaginatedT, "meta">> => {
  return apiClient.get(`/entries/by-dates?from=${from}&to=${to}`)
    .then((response) => response.data)
}


export type entriesStatsT = {
  monthMoneySpent: string,
  dayCalories: number | null
}
export const getEntriesStats = (userId?: string): Promise<entriesStatsT> => {
  const adminPrefix = userId ? `admin/users/${userId}` : ""
  return apiClient.get(adminPrefix + "/entries/stats").then((response) => response.data.data)
}

type createEntryProps = {
  userId?: string
  body: EntryBodyT
}

export const createEntry = ({ body, userId }: createEntryProps) => {
  const adminPrefix = userId ? `admin/users/${userId}` : ""
  return apiClient.post(adminPrefix + "/entries", body)
}


export const deleteEntry = (entryId: number) => {
  return apiClient.delete(`/admin/users/entries/${entryId}`)
}


type EditEntryProps = {
  id: number
  body: EntryBodyT
}

export const editEntry = ({ id, body }: EditEntryProps) => {
  return apiClient.put(`/admin/users/entries/${id}`, body)
}

