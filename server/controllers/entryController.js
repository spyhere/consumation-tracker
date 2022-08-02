const { PrismaClient } = require("@prisma/client")
const createEntryRequest = require("../requests/createEntryRequests")

const prisma = new PrismaClient()

class EntryController {

  static async index(req, res) {
    const cursor = req.query.cursor ? {
      skip: 1,
      cursor: {
        id: Number(req.query.cursor)
      }
    } : {}

    const userId = req.user.id
    const monthStart = new Date(new Date().setDate(1))
    const dayStart = new Date(new Date().setHours(0, 0, 0, 0))

    const [dates, spent, caloriesSum] = await prisma.$transaction([
      prisma.day.findMany({
        take: Number(process.env.ENTRIES_PAGINATION),
        ...cursor,
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
      }),

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
      data: { dates, spent: spent._sum.price, calories: caloriesSum._sum.calories },
      meta: { cursor: dates[dates.length - 1].id }
    })
  }

  static async store(req, res) {
    const hasErrors = createEntryRequest(req.body)
    if (!!hasErrors) {
      return res.status(hasErrors[0]).send(hasErrors[1])
    }

    const user_id = req.user.id
    const { calories, food, price } = req.body

    const newEntry = await prisma.entry.create({
      data: {
        calories: Number(calories),
        food,
        price: Number(price) || 0,
        user_id: Number(user_id),
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
}

module.exports = EntryController
