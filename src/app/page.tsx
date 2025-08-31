import Link from 'next/link'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute animate-float-slow top-1/4 left-1/4 w-4 h-4 bg-white/10 rounded-full"></div>
        <div className="absolute animate-float-medium top-3/4 left-3/4 w-6 h-6 bg-white/5 rounded-full"></div>
        <div className="absolute animate-float-fast top-1/2 right-1/4 w-3 h-3 bg-white/20 rounded-full"></div>
        <div className="absolute animate-float-slow top-1/3 right-1/3 w-2 h-2 bg-white/15 rounded-full"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full">
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              {/* Logo/Icon */}
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 transform hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>

              <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text ">
            Task Manager
              </h1>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Transform your productivity with our next-generation task management platform
              </p>
            </div>
            
            <div className="space-y-4">
              <Link
                href="/login"
                className="group w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 flex items-center justify-center space-x-2 border border-cyan-400/30"
              >
                <span>Sign In</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link
                href="/register"
                className="group w-full bg-white/10 backdrop-blur-sm text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:bg-white/20 hover:shadow-xl flex items-center justify-center space-x-2 border border-white/30"
              >
                <span>Create Account</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </Link>
            </div>

            {/* Features Preview */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="group">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-white/70 text-sm font-medium">Lightning Fast</p>
                </div>
                <div className="group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-white/70 text-sm font-medium">Smart Tracking</p>
                </div>
                <div className="group">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-white/70 text-sm font-medium">Mobile Ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
