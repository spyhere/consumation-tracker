const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { name: 'Alice' },
    update: {},
    create: {
      name: 'Alice',
      Entry: {
        create: {
          calories: 500,
          food: 'burger',
          price: 5.00,
        },
      },
    },
  })

  const bob = await prisma.user.upsert({
    where: { name: 'Bob' },
    update: {},
    create: {
      name: 'Bob',
      role: 'ADMIN',
      Entry: {
        create: {
          calories: 500,
          food: 'pizza',
          price: 10.00,
        },
      },
    },
  })
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
