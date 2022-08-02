const { PrismaClient } = require("@prisma/client")

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
    res.send({ data: entries, meta: { cursor: entries[entries.length-1].id } })
  }

  static async store(req, res) {
    //
  }

  static async update(req, res) {
    //
  }

  static async destroy(req, res) {
    //
  }
}

module.exports = EntryController
