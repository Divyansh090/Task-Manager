'use client'
import { useState} from 'react'
import { signOut } from 'next-auth/react'
import { Task } from '@/types'
import TaskForm from './taskForm'
import TaskList from './taskList'
import { Plus, LogOut, User, Search, Filter, BarChart3, Zap, Target, TrendingUp, Bell, Settings } from 'lucide-react'

interface DashboardProps {
  user: {
    id: string
    name: string | null
    email: string
  }
  initialTasks: Task[]
}

export default function Dashboard({ user, initialTasks }: DashboardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  

  const handleTaskCreated = (newTask: Task) => {
    setTasks([newTask, ...tasks])
    setShowForm(false)
  }

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
    setEditingTask(null)
  }

  const handleTaskDeleted = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const handleTaskStatusToggle = async (taskId: string, status: 'PENDING' | 'COMPLETED') => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        const updatedTask = await response.json()
        setTasks(tasks.map(task => task.id === taskId ? updatedTask : task))
      }
    } catch (error) {
      console.error('Failed to update task status:', error)
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter.toUpperCase()
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    return matchesFilter && matchesSearch
  })

  const pendingCount = tasks.filter(task => task.status === 'PENDING').length
  const completedCount = tasks.filter(task => task.status === 'COMPLETED').length
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0

  const getCurrentGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const getMotivationalMessage = () => {
    if (completionRate === 100) return "🎉 Amazing! You've completed all your tasks!"
    if (completionRate >= 75) return "🚀 You're crushing it! Keep going!"
    if (completionRate >= 50) return "💪 Great progress! You're halfway there!"
    if (completionRate >= 25) return "🌱 Good start! Keep building momentum!"
    return "✨ Ready to tackle your tasks? Let's begin!"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-2xl animate-float-fast"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-xl bg-white/30 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Task Manager 
                </h1>
                <p className="text-gray-500 text-sm">Productivity Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Bell className="w-5 h-5" />
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {pendingCount > 9 ? '9+' : pendingCount}
                  </span>
                )}
              </button>

              {/* Settings */}
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Settings className="w-5 h-5" />
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <div className="flex items-center text-sm font-medium text-gray-800">
                    <User size={16} className="mr-2 text-gray-500" />
                    {user.name || user.email.split('@')[0]}
                  </div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <LogOut size={16} className="mr-1" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="backdrop-blur-xl bg-gradient-to-r from-white/40 to-white/20 border border-white/30 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {getCurrentGreeting()}, {user.name?.split(' ')[0] || user.email.split('@')[0]}! 👋
                </h2>
                <p className="text-gray-600 text-lg mb-4">{getMotivationalMessage()}</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Target className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{completionRate}% Complete</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                    <span>{pendingCount} Pending</span>
                  </div>
                </div>
              </div>
              
              {/* Completion Ring */}
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-gradient-to-r from-cyan-400 to-blue-500"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={`${completionRate}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">{completionRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group backdrop-blur-xl bg-gradient-to-br from-blue-400/20 to-cyan-400/20 border border-white/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500 rounded-2xl shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-blue-600 font-semibold text-sm">Total Tasks</p>
                <p className="text-3xl font-bold text-blue-800">{tasks.length}</p>
              </div>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div className="group backdrop-blur-xl bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border border-white/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-500 rounded-2xl shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-yellow-600 font-semibold text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-800">{pendingCount}</p>
              </div>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${tasks.length > 0 ? (pendingCount / tasks.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <div className="group backdrop-blur-xl bg-gradient-to-br from-green-400/20 to-emerald-400/20 border border-white/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500 rounded-2xl shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-green-600 font-semibold text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-800">{completedCount}</p>
              </div>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search Bar */}
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/50 border border-white/30 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 backdrop-blur-sm transition-all duration-300"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500 mr-2" />
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
              >
                All Tasks
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filter === 'pending'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filter === 'completed'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
              >
                Completed
              </button>
            </div>

            {/* New Task Button */}
            <button
              onClick={() => setShowForm(true)}
              className="group flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
            >
              <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
              New Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          <TaskList
            tasks={filteredTasks}
            onEditTask={setEditingTask}
            onDeleteTask={handleTaskDeleted}
            onToggleStatus={handleTaskStatusToggle}
          />
        </div>
      </main>

      {/* Task Form Modal */}
      {(showForm || editingTask) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="backdrop-blur-xl bg-white/90 border border-white/20 rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <TaskForm
              task={editingTask}
              onSave={editingTask ? handleTaskUpdated : handleTaskCreated}
              onCancel={() => {
                setShowForm(false)
                setEditingTask(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}