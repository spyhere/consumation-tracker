const { PrismaClient } = require("@prisma/client")
const UserService = require("../services/userService")

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

    const usersWithStats = UserService.calculateUserWeekStats(users, previousEntries)
    res.send({ data: usersWithStats })
  }

}


module.exports = UserController
