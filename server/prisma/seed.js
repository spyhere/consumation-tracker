const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const aliceEntries = require("./aliceEntries")
const bobEntries = require("./bobEntries")

async function main() {
  const alice = await prisma.user.upsert({
    where: { name: 'Alice' },
    update: {},
    create: {
      name: 'Alice',
      Entry: {
        createMany: { data: aliceEntries },
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
        createMany: { data: bobEntries },
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
