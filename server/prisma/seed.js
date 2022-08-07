const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { faker } = require("@faker-js/faker")

const lastWeekStart = new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString()
const nowTime = new Date().toISOString()

async function main() {
  const alice = await prisma.user.create({
    data: { name: 'Alice' }
  })

  for (let i = 0; i < 100; i++) {
    const entry = {
      calories: Number(faker.commerce.price(250, 600, 0)),
      createdAt: faker.date.between(lastWeekStart, nowTime).toISOString(),
      food: faker.helpers.arrayElement(["burger", "cheese", "apple", "chicken", "chips", "rolls", "wings", "shawerma", "milkshake"]),
      price: Number(faker.commerce.price(15, 70)),
    }
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

  for (let i = 0; i < 100; i++) {
    const entry = {
      calories: Number(faker.commerce.price(200, 500, 0)),
      createdAt: faker.date.between(lastWeekStart, nowTime).toISOString(),
      food: faker.helpers.arrayElement(["burger", "cheese", "apple", "chicken", "chips", "rolls", "wings", "shawerma"]),
      price: Number(faker.commerce.price(20, 100)),
    }
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
