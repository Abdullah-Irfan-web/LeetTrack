'use client'
import { Eye, EyeOff, X } from 'lucide-react'
import { useState } from 'react'

export default function UniqueModal({ accounts, onClose }) {
  const [cookies, setCookies] = useState({})
  const [loading, setLoading] = useState(false)
  const [uniqueResults, setUniqueResults] = useState(null)
  const [showCookies, setShowCookies] = useState({})

  const handleCookieChange = (username, value) => {
    setCookies(prev => ({ ...prev, [username]: value }))
  }

  const toggleShowCookie = (username) => {
    setShowCookies(prev => ({ ...prev, [username]: !prev[username] }))
  }

  const handleFindUnique = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/unique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accounts: cookies })
      })
      const data = await response.json()
      setUniqueResults(data)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 mx-4">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Find Unique Problems</h2>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
    {/* Important Note */}

          {/* Instructions */}
          <p className="text-white/50 text-sm mb-6 leading-relaxed">
            Enter your session cookie for each account. Your cookies{' '}
            <span className="text-green-400">never leave your browser</span> — 
            everything is processed securely.
            <span>Note: Kindly Keep LoggedIn </span>
          </p>

          {/* How to get cookie */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 text-sm text-white/50">
            <p className="font-semibold text-white/70 mb-2">How to get your session cookie:</p>
            <ol className="list-decimal list-inside space-y-1">
  <li>Open LeetCode and log in</li>
  <li>Press F12 to open DevTools</li>
  <li>Chrome/Edge → <span className="text-orange-400">Application</span> tab</li>
  <li>Firefox → <span className="text-orange-400">Storage</span> tab</li>
  <li>Click Cookies → leetcode.com</li>
  <li>Copy value of <span className="text-orange-400">LEETCODE_SESSION</span></li>
</ol>
          </div>
          <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4 mb-4">
  <p className="text-yellow-400 text-sm font-semibold mb-1">⚠️ Important</p>
  <p className="text-yellow-400/70 text-sm leading-relaxed">
    Keep all your accounts logged in simultaneously while copying cookies. 
    Logging in to a new account may change the cookie of your previous account.
    Open each account in a <span className="font-semibold">different browser or incognito window</span>.
  </p>
</div>

          {/* Cookie Inputs */}
          <div className="space-y-4 mb-6">
            {accounts.map((username) => (
              <div key={username}>
                <label className="text-white/60 text-sm mb-1 block">
                  {username}
                </label>
                <div className="flex gap-2">
                  <input
                    type={showCookies[username] ? 'text' : 'password'}
                    placeholder="Paste LEETCODE_SESSION cookie"
                    value={cookies[username] || ''}
                    onChange={(e) => handleCookieChange(username, e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm placeholder-white/20 outline-none focus:border-orange-400/50"
                  />
                  <button
                    onClick={() => toggleShowCookie(username)}
                    className="text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showCookies[username] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleFindUnique}
            disabled={loading || Object.keys(cookies).length === 0}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {loading ? 'Analyzing...' : 'Find Unique Count 🔍'}
          </button>

          {/* Results */}
          {uniqueResults && (
            <div className="mt-6 border-t border-white/10 pt-6">

              {/* Unique Count */}
              <div className="text-center mb-6">
                <p className="text-5xl font-bold text-orange-400">{uniqueResults.uniqueCount}</p>
                <p className="text-white/50 text-sm mt-1">Unique Problems Solved</p>
                <p className="text-white/30 text-xs mt-1">
                  You were overcounting by{' '}
                  <span className="text-red-400">{uniqueResults.duplicateCount} problems</span>
                </p>
              </div>

              {/* Difficulty Breakdown */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-3 text-center">
                  <p className="text-green-400 font-bold text-xl">{uniqueResults.easy}</p>
                  <p className="text-green-400/70 text-xs mt-1">Easy</p>
                </div>
                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3 text-center">
                  <p className="text-yellow-400 font-bold text-xl">{uniqueResults.medium}</p>
                  <p className="text-yellow-400/70 text-xs mt-1">Medium</p>
                </div>
                <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-3 text-center">
                  <p className="text-red-400 font-bold text-xl">{uniqueResults.hard}</p>
                  <p className="text-red-400/70 text-xs mt-1">Hard</p>
                </div>
              </div>

              {/* Duplicate Problems List */}
              {uniqueResults.duplicates?.length > 0 && (
                <div>
                  <p className="text-white/60 text-sm font-semibold mb-3">
                    Duplicate Problems ({uniqueResults.duplicates.length})
                  </p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {uniqueResults.duplicates.map((problem, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2"
                      >
                        <span className="text-white/70 text-sm">{problem.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          problem.difficulty === 'Easy' ? 'bg-green-400/20 text-green-400' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-red-400/20 text-red-400'
                        }`}>
                          {problem.difficulty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </>
  )
}