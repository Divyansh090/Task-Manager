'use client'
import { useState } from 'react'
import { Task } from '@/types'
import { X, Save, Sparkles, Type, FileText } from 'lucide-react'

interface TaskFormProps {
  task?: Task | null
  onSave: (task: Task) => void
  onCancel: () => void
}

export default function TaskForm({ task, onSave, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = task ? `/api/tasks/${task.id}` : '/api/tasks'
      const method = task ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      })

      if (response.ok) {
        const savedTask = await response.json()
        onSave(savedTask)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to save task')
      }
    } catch  {
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="text-gray-500 text-sm">
              {task ? 'Update your task details' : 'Add a new task to your workflow'}
            </p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm backdrop-blur-sm animate-slide-up">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Title Input */}
        <div className="group">
          <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
            <Type className="w-4 h-4 mr-2 text-cyan-500" />
            Task Title *
          </label>
          <div className="relative">
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-4 bg-gradient-to-r from-white/60 to-white/40 border border-white/50 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 backdrop-blur-sm transition-all duration-300 focus:scale-[1.02]"
              placeholder="Enter an amazing task title..."
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-focus-within:from-cyan-500/5 group-focus-within:to-blue-500/5 pointer-events-none transition-all duration-300"></div>
          </div>
        </div>

        {/* Description Input */}
        <div className="group">
          <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
            <FileText className="w-4 h-4 mr-2 text-purple-500" />
            Description
            <span className="text-gray-400 font-normal ml-2">(optional)</span>
          </label>
          <div className="relative">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-4 bg-gradient-to-r from-white/60 to-white/40 border border-white/50 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 backdrop-blur-sm transition-all duration-300 focus:scale-[1.02] resize-none"
              placeholder="Add some details about your task..."
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/5 group-focus-within:to-pink-500/5 pointer-events-none transition-all duration-300"></div>
          </div>
          <div className="flex justify-end mt-2">
            <span className="text-xs text-gray-400">
              {description.length}/500 characters
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-gray-700 bg-white/60 border border-white/50 rounded-2xl font-semibold hover:bg-white/80 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !title.trim()}
            className="group px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>{task ? 'Update Task' : 'Create Task'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
