'use client'
import { Task } from '@/types'
import TaskItem from './taskItem'
import { ListChecks, Sparkles } from 'lucide-react'

interface TaskListProps {
  tasks: Task[]
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  onToggleStatus: (taskId: string, status: 'PENDING' | 'COMPLETED') => void
}

export default function TaskList({ tasks, onEditTask, onDeleteTask, onToggleStatus }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative mx-auto w-32 h-32 mb-8">
          {/* Animated background circles */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full animate-pulse animation-delay-2000"></div>
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl">
              <ListChecks className="w-12 h-12 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-700 flex items-center justify-center space-x-2">
            <Sparkles className="w-6 h-6 text-cyan-500" />
            <span>Ready for Your First Task?</span>
          </h3>
          <p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
            Your productivity journey starts here. Create your first task and watch your goals come to life!
          </p>
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-2000"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-4000"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-200/50">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <TaskItem
            task={task}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task.id)}
            onToggleStatus={(status) => onToggleStatus(task.id, status)}
          />
        </div>
      ))}
    </div>
  )
}
