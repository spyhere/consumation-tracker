const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const aliceEntries = require("./aliceEntries")
const bobEntries = require("./bobEntries")

async function main() {
  const alice = await prisma.user.create({
    data: { name: 'Alice' }
  })

  for (const entry of aliceEntries) {
    const daytime = entry.createdAt.split('T')[0]
    await prisma.user.update({
      where: { name: alice.name },
      data: {
        Entry: {
          create: {
            calories: entry.calories,
            food: entry.food,
            price: entry.price,
            createdAt: entry.createdAt,
            Day: {
              connectOrCreate: {
                where: {
                  daytime
                },
                create: {
                  daytime
                }
              }
            }
          }
        }
      }
    })
  }

  const bob = await prisma.user.create({
    data: { name: 'Bob', role: 'ADMIN' }
  })

  for (const entry of bobEntries) {
    const daytime = entry.createdAt.split('T')[0]
    await prisma.user.update({
      where: { name: bob.name },
      data: {
        Entry: {
          create: {
            calories: entry.calories,
            food: entry.food,
            price: entry.price,
            createdAt: entry.createdAt,
            Day: {
              connectOrCreate: {
                where: {
                  daytime
                },
                create: {
                  daytime
                }
              }
            }
          }
        }
      }
    })
  }
  console.log({ alice, bob })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
