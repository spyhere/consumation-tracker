import { useQuery } from "@tanstack/react-query"
import UserService from "api/user/"

const useUsersStatsKey = "users-stats"
const useUsersStats = () => {
  return useQuery([useUsersStatsKey], () => UserService.getUsersStats())
}

export { useUsersStatsKey, useUsersStats }
