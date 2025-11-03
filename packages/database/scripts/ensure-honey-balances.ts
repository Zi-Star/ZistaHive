import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function ensureHoneyBalances() {
  try {
    console.log('Starting honey balance check...')
    
    // Get all users without honey balances
    const usersWithoutBalances = await prisma.user.findMany({
      where: {
        honeyBalance: null
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    })
    
    console.log(`Found ${usersWithoutBalances.length} users without honey balances`)
    
    // Create honey balances for users who don't have them
    for (const user of usersWithoutBalances) {
      console.log(`Creating honey balance for user: ${user.email}`)
      
      await prisma.honeyBalance.create({
        data: {
          userId: user.id,
          balance: 0,
          totalEarned: 0,
          totalSpent: 0,
          streakDays: 0
        }
      })
      
      console.log(`Created honey balance for user: ${user.email}`)
    }
    
    console.log('Honey balance check completed successfully')
  } catch (error) {
    console.error('Error ensuring honey balances:', error)
  } finally {
    await prisma.$disconnect()
  }
}

ensureHoneyBalances()