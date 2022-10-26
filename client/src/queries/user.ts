import { useQuery } from "@tanstack/react-query"
import UserService from "api/user/"

export const useUsersStatsKey = "users-stats"
export const useUsersStats = () => {
  return useQuery([useUsersStatsKey], () => UserService.getUsersStats())
}
