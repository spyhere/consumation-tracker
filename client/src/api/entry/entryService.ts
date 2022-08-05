import apiClient from "../apiClient"
import { DayT } from "./types"
import { QueryFunctionContext } from "@tanstack/react-query"

export type entriesPaginatedT = {
  data: {
    dates: DayT[]
  }
  meta: {
    cursor: number
  }
}
export const getPaginatedEntries = ({ pageParam }: QueryFunctionContext): Promise<entriesPaginatedT> => {
  return apiClient.get(`/entries?cursor=${pageParam || ""}`)
    .then((response) => response.data)
}


export type entriesStatsT = {
  monthMoneySpent: string,
  dayCalories: number | null
}
export const getEntriesStats = (): Promise<entriesStatsT> => {
  return apiClient.get("/entries/stats").then((response) => response.data.data)
}


export const createEntry = (body: Record<string, unknown>) => {
  return apiClient.post("/entries", body)
}

