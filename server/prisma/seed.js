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
    await prisma.day.upsert({
      where: { daytime },
      create: {
        daytime,
        Entry: {
          create: {
            calories: entry.calories,
            food: entry.food,
            price: entry.price,
            createdAt: entry.createdAt,
            User: {
              connect: { id: alice.id }
            }
          }
        },
        User: {
          connect: { id: alice.id }
        }
      },
      update: {
        Entry: {
          create: {
            calories: entry.calories,
            food: entry.food,
            price: entry.price,
            createdAt: entry.createdAt,
            User: {
              connect: { id: alice.id }
            }
          }
        },
        User: {
          connect: { id: alice.id }
        }
      }
    })
  }

  const bob = await prisma.user.create({
    data: { name: 'Bob', role: 'ADMIN' }
  })

  for (const entry of bobEntries) {
    const daytime = entry.createdAt.split('T')[0]
    await prisma.day.upsert({
      where: { daytime },
      create: {
        daytime,
        Entry: {
          create: {
            calories: entry.calories,
            food: entry.food,
            price: entry.price,
            createdAt: entry.createdAt,
            User: {
              connect: { id: bob.id }
            }
          }
        },
        User: {
          connect: { id: bob.id }
        }
      },
      update: {
        Entry: {
          create: {
            calories: entry.calories,
            food: entry.food,
            price: entry.price,
            createdAt: entry.createdAt,
            User: {
              connect: { id: bob.id }
            }
          }
        },
        User: {
          connect: { id: bob.id }
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
