'use client'
import { useState } from 'react'
import { Task } from '@/types'
import { Edit2, Trash2, Check, Clock, Calendar } from 'lucide-react'

interface TaskItemProps {
  task: Task
  onEdit: () => void
  onDelete: () => void
  onToggleStatus: (status: 'PENDING' | 'COMPLETED') => void
}

export default function TaskItem({ task, onEdit, onDelete, onToggleStatus }: TaskItemProps) {
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  
  const handleStatusToggle = async () => {
    setLoading(true)
    const newStatus = task.status === 'PENDING' ? 'COMPLETED' : 'PENDING'
    await onToggleStatus(newStatus)
    setLoading(false)
  }

  const handleDelete = async () => {
    if (confirm('🗑️ Are you sure you want to delete this task? This action cannot be undone.')) {
      setDeleting(true)
      try {
        const response = await fetch(`/api/tasks/${task.id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          onDelete()
        } else {
          console.error('Failed to delete task')
        }
      } catch (error) {
        console.error('Failed to delete task:', error)
      } finally {
        setDeleting(false)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) return `${diffInDays}d ago`
    return formatDate(dateString)
  }

  return (
    <div className={`group relative p-6 hover:bg-gradient-to-r hover:from-white/30 hover:to-white/10 transition-all duration-300 ${
      task.status === 'COMPLETED' ? 'opacity-75' : ''
    } ${deleting ? 'opacity-50 animate-pulse' : ''}`}>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>

      <div className="relative flex items-start space-x-4">
        {/* Status Toggle Button */}
        <button
          onClick={handleStatusToggle}
          disabled={loading || deleting}
          className={`relative flex-shrink-0 w-8 h-8 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
            task.status === 'COMPLETED'
              ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-400 text-white shadow-lg shadow-green-500/25'
              : 'border-gray-300 hover:border-cyan-500 hover:bg-cyan-50'
          } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        >
          {loading ? (
            <div className="w-4 h-4 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : task.status === 'COMPLETED' ? (
            <Check size={16} className="drop-shadow-sm" />
          ) : null}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Title */}
          <h3 className={`text-lg font-semibold transition-all duration-300 ${
            task.status === 'COMPLETED' 
              ? 'line-through text-gray-500' 
              : 'text-gray-800 group-hover:text-gray-900'
          }`}>
            {task.title}
          </h3>
          
          {/* Description */}
          {task.description && (
            <p className={`text-sm leading-relaxed transition-all duration-300 ${
              task.status === 'COMPLETED' ? 'text-gray-400' : 'text-gray-600 group-hover:text-gray-700'
            }`}>
              {task.description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex items-center space-x-4 text-sm">
            {/* Status Badge */}
            <div className={`inline-flex items-center px-3 py-1 rounded-full font-medium ${
              task.status === 'PENDING'
                ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                : 'bg-green-100 text-green-700 border border-green-200'
            }`}>
              {task.status === 'PENDING' ? (
                <>
                  <Clock size={12} className="mr-1" />
                  Pending
                </>
              ) : (
                <>
                  <Check size={12} className="mr-1" />
                  Completed
                </>
              )}
            </div>

            {/* Timestamps */}
            <div className="flex items-center text-gray-500 space-x-3">
              <div className="flex items-center">
                <Calendar size={12} className="mr-1" />
                <span>Created {getTimeAgo(task.createdAt)}</span>
              </div>
              {task.updatedAt !== task.createdAt && (
                <div className="flex items-center">
                  <span className="text-gray-300">•</span>
                  <span className="ml-1">Updated {getTimeAgo(task.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={onEdit}
            disabled={deleting}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 disabled:opacity-50"
            title="Edit task"
          >
            <Edit2 size={16} />
          </button>
          
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 disabled:opacity-50"
            title="Delete task"
          >
            {deleting ? (
              <div className="w-4 h-4 border border-red-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Progress line for completed tasks */}
      {task.status === 'COMPLETED' && (
        <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-50"></div>
      )}
    </div>
  )
}