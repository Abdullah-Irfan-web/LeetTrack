'use client'
import { User, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddAccountForm() {
  const [username, setUsername] = useState('')
  const [accounts, setAccounts] = useState([])
  const router = useRouter()

  const handleAdd = () => {
    if (!username.trim()) return
    if (accounts.includes(username.trim())) return
    if (accounts.length >= 5) return
   
    setAccounts([...accounts, username.trim()])
    setUsername('')
  }

  const handleRemove = (name) => {
    setAccounts(accounts.filter(a => a !== name))
  }

  const handleAnalyze = () => {
    router.push(`/dashboard?users=${accounts.join(',')}`)
  }

  return (
    <div className="max-w-xl mx-auto mt-5 px-4">

      {/* Input Row */}
      <div className="flex gap-3">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Enter LeetCode username"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none focus:border-orange-400/50"
        />
        <button type='button'
          onClick={handleAdd}
         
          className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Add
        </button>
      </div>

      {/* Max accounts note */}
      <p className="text-white/30 text-xs mt-2 text-right">Max 5 accounts</p>

      {/* Added Accounts */}
      {accounts.length > 0 && (
        <div className="mt-6 flex flex-col gap-3">
          {accounts.map((acc) => (
            <div
              key={acc}
              className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <User size={16} className="text-orange-400" />
                <span className="text-white">{acc}</span>
              </div>
              <button
                onClick={() => handleRemove(acc)}
                className="text-white/30 hover:text-red-400 transition-colors "
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Analyze Button */}
      {accounts.length > 0 && (
        <button
          onClick={handleAnalyze}
          className="w-full mt-8 bg-orange-500 hover:bg-orange-600 cursor-pointer text-white py-4 rounded-lg font-semibold text-lg transition-colors"
        >
          Analyze Accounts →
        </button>
      )}

    </div>
  )
}