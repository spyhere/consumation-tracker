
class UserService {

  static calculateUserWeekStats(users, previousEntries) {
    return users.map(it => {
      const currentWeekEntries = it.Entry.length
      const currentWeekCaloriesSum = it.Entry.reduce((acc, next) => acc + next.calories, 0)
      const averageCalories = ((currentWeekCaloriesSum * 1000) / currentWeekEntries) / 1000
      const previousWeekEntries = previousEntries.find(entry => entry.user_id === it.id)?._count || 0

      const user = { ...it }
      delete user.Entry
      return {
        ...user,
        previousWeekEntries,
        currentWeekEntries,
        averageCalories,
      }
    })
  }

}

module.exports = UserService
