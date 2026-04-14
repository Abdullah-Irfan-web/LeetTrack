

import { User } from 'lucide-react'
import Link from 'next/link'
export default function AccountsStatsCard({ username, realName, ranking, total, easy, medium, hard }) {
  return (
    <Link href={`https://leetcode.com/${username}`}>
    <div className="bg-white/5 border  border-white/10 rounded-xl p-6 hover:border-orange-400/30 transition-all">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-orange-400/10 p-2 rounded-lg">
            <User size={20} className="text-orange-400" />
          </div>
          <div>
            <p className="font-semibold text-white">{username}</p>
            {realName && <p className="text-white/40 text-sm">{realName}</p>}
          </div>
        </div>
        <div className="text-white/40 text-sm">
          # {ranking?.toLocaleString()}
        </div>
      </div>

      {/* Total */}
      <div className="text-center mb-6">
        <p className="text-5xl font-bold text-white">{total}</p>
        <p className="text-white/40 text-sm mt-1">Problems Solved</p>
      </div>

      {/* Difficulty Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-3 text-center">
          <p className="text-green-400 font-bold text-xl">{easy}</p>
          <p className="text-green-400/70 text-xs mt-1">Easy</p>
        </div>
        <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3 text-center">
          <p className="text-yellow-400 font-bold text-xl">{medium}</p>
          <p className="text-yellow-400/70 text-xs mt-1">Medium</p>
        </div>
        <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-3 text-center">
          <p className="text-red-400 font-bold text-xl">{hard}</p>
          <p className="text-red-400/70 text-xs mt-1">Hard</p>
        </div>
      </div>




    </div>
    </Link>
  )
}