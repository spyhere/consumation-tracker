const { PrismaClient } = require("@prisma/client")
const createEntryRequest = require("../requests/createEntryRequests")

const prisma = new PrismaClient()

class EntryController {

  static async index(req, res) {
    let query = { take: Number(process.env.ENTRIES_PAGINATION) }
    if (req.query.cursor) {
      query = {
        take: Number(process.env.ENTRIES_PAGINATION),
        skip: 1,
        cursor: {
          id: Number(req.query.cursor),
        }
      }
    } else if (req.query.from) {
      query = {
        where: {
          daytime: {
            lte: req.query.to || new Date(),
            gte: req.query.from,
          }
        }
      }
    }

    const userId = req.user.id

    const dates = await prisma.day.findMany({
      ...query,
      include: {
        Entry: {
          where: {
            user_id: userId
          },
          orderBy: {
            createdAt: 'desc'
          },
        }
      },
      orderBy: {
        daytime: 'desc'
      }
    })

    res.send({
      data: { dates },
      meta: { cursor: dates[dates.length - 1]?.id || null }
    })
  }

  static async store(req, res) {
    const hasErrors = createEntryRequest(req.body)
    if (!!hasErrors) {
      return res.status(hasErrors[0]).send(hasErrors[1])
    }

    const user_id = req.user.id
    const { calories, food, price } = req.body

    const daytime = new Date().toISOString().split("T")[0]
    const newEntry = await prisma.entry.create({
      data: {
        calories: Number(calories),
        food,
        price: Number(price) || 0,
        User: {
          connect: {
            id: Number(user_id)
          }
        },
        Day: {
          connectOrCreate: {
            where: {
              daytime
            },
            create: {
              daytime
            }
          }
        },
      },
      include: {
        Day: true
      }
    })

    res.status(201).send({ data: newEntry })
  }

  static async update(req, res) {
    const hasErrors = createEntryRequest(req.body)
    if (!!hasErrors) {
      return res.status(hasErrors[0]).send(hasErrors[1])
    }

    const { calories, food, price } = req.body
    const entryId = Number(req.params.entry)

    try {
      const entry = await prisma.entry.update({
        where: { id: entryId },
        data: {
          calories: Number(calories),
          food,
          price: Number(price) || 0,
          updatedAt: new Date()
        }
      })
      res.send({ data: entry })
    } catch (e) {
      res.status(400).send(e.message)
    }
  }

  static async destroy(req, res) {
    const entryId = Number(req.params.entry)

    try {
      await prisma.entry.delete({
        where: { id: entryId }
      })
      res.send()
    } catch (e) {
      res.status(400).send(e.message)
    }
  }

  static async getStats(req, res) {
    const userId = req.user.id
    const monthStart = new Date(new Date().setDate(1))
    const dayStart = new Date(new Date().setHours(0, 0, 0, 0))

    const [monthMoneySpent, dayCalories] = await prisma.$transaction([
      prisma.entry.aggregate({
        _sum: {
          price: true,
        },
        where: {
          user_id: userId,
          createdAt: {
            lte: new Date(),
            gte: monthStart,
          },
        }
      }),
      prisma.entry.aggregate({
        _sum: {
          calories: true
        },
        where: {
          user_id: userId,
          createdAt: {
            gte: dayStart,
          }
        }
      })
    ])

    res.send({
      data: {
        monthMoneySpent: monthMoneySpent._sum.price,
        dayCalories: dayCalories._sum.calories
      }
    })
  }
}

module.exports = EntryController
