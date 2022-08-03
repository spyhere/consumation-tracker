const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

class UserController {

  static async index(req, res) {
    const currentWeekEnd = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
    const lastWeekEnd = new Date(Date.now() - 13 * 24 * 60 * 60 * 1000)

    const [users, previousEntries] = await prisma.$transaction([
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          Entry: {
            where: {
              createdAt: {
                lte: new Date(),
                gte: currentWeekEnd,
              }
            }
          }
        }
      }),
      prisma.entry.groupBy({
        by: ['user_id'],
        where: {
          createdAt: {
            lte: currentWeekEnd,
            gte: lastWeekEnd,
          }
        },
        _count: true
      })
    ])

    const parsedUsers = users.map(it => {
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


    res.send({ data: parsedUsers })
  }

}


module.exports = UserController
