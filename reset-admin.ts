
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@gmail.com'
  const password = '123'
  
  try {
    const existingAdmin = await prisma.admin.findUnique({
      where: { email }
    })

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    if (existingAdmin) {
      console.log('Admin user exists. Updating password...')
      await prisma.admin.update({
        where: { email },
        data: { passwordHash }
      })
      console.log('Password updated successfully.')
    } else {
      console.log('Admin user does not exist. Creating...')
      await prisma.admin.create({
        data: {
          email,
          passwordHash
        }
      })
      console.log('Admin user created successfully.')
    }
  } catch (e) {
    console.error('Error:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
