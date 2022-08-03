
class EntryService {

  static addCaloriesCountPerDay(days) {
    return days.map(it => {
      const sum = it.Entry.reduce((acc, next) => acc + next.calories, 0)
      return {
        ...it,
        consumed: sum,
      }
    })
  }

}

module.exports = EntryService
