import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Dashboard from '@/components/dashboard'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  if (!session?.user?.email) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { Task: { orderBy: { createdAt: "desc" } } },
  })

  if (!user) {
    redirect('/login')
  }

  return (
    <Dashboard
      user={user}
      initialTasks={user.Task.map(task => ({
        ...task,
        description: task.description === null ? undefined : task.description,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
      }))}
    />
  )
}