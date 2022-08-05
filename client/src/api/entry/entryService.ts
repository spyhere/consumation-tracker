import apiClient from "../apiClient"
import { DayT } from "./types"
import { QueryFunctionContext } from "@tanstack/react-query"

export type entriesPaginated = {
  data: {
    dates: DayT[]
  }
  meta: {
    cursor: number
  }
}
export const getPaginatedEntries = ({ pageParam }: QueryFunctionContext): Promise<entriesPaginated> => {
  return apiClient.get(`/entries?cursor=${pageParam || ""}`)
    .then((response) => response.data)
}


export type entriesStats = {
  monthMoneySpent: string,
  dayCalories: number | null
}
export const getEntriesStats = (): Promise<entriesStats> => {
  return apiClient.get("/entries/stats").then((response) => response.data.data)
}


export const createEntry = (body: Record<string, unknown>) => {
  return apiClient.post("/entries", body)
}

