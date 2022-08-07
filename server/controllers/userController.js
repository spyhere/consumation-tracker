const { PrismaClient } = require("@prisma/client")
const UserService = require("../services/userService")

const prisma = new PrismaClient()

class UserController {

  static async index(req, res) {
    const currentWeekStart = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
    const lastWeekStart = new Date(Date.now() - 13 * 24 * 60 * 60 * 1000)

    const [users, previousEntries] = await prisma.$transaction([
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          Entry: {
            where: {
              createdAt: {
                lte: new Date(),
                gte: currentWeekStart,
              }
            }
          }
        }
      }),
      prisma.entry.groupBy({
        by: ['user_id'],
        where: {
          createdAt: {
            lte: currentWeekStart,
            gte: lastWeekStart,
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
