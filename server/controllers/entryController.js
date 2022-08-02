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
    const entries = await prisma.entry.findMany({
      take: 5,
      ...cursor,
      where: {
        user_id: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    res.send({ data: entries, meta: { cursor: entries[entries.length - 1].id } })
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
        price: Number(price),
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
          price: Number(price),
          updatedAt: new Date()
        }
      })
      res.send({ data: entry })
    } catch (e) {
      res.status(400).send(e.message)
    }
  }

  static async destroy(req, res) {
    //
  }
}

module.exports = EntryController
