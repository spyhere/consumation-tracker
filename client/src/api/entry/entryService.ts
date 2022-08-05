import apiClient from "../apiClient"
import { DayT } from "./types"

export type entriesPaginated = {
  data: {
    dates: DayT[]
  }
  meta: {
    cursor: number
  }
}
export const getPaginatedEntries = (cursor?: number, userId?: number): Promise<entriesPaginated> => {
  return apiClient.get(`/entries?cursor=${cursor || ""}&user=${userId || ""}`)
    .then((response) => response.data)
}

export type entriesStats = {
  monthMoneySpent: string,
  dayCalories: number | null
}
export const getEntriesStats = (): Promise<entriesStats> => {
  return apiClient.get("/entries/stats").then((response) => response.data.data)
}

