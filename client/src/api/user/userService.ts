import apiClient from "../apiClient"
import { UserT } from "./types"

type userStatsT = {
  data: UserT[]
}

export const getUsersStats = (): Promise<userStatsT> => {
  return apiClient.get(`/admin/users`).then((response) => response.data)
}
