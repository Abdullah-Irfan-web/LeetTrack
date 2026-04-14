'use client'
import { useState } from 'react'
import UniqueModal from './UniqueModal'

export default function EngagementSection({ totalCombined, accountCount,accounts }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="mt-10 mb-6">
      
      {/* Divider */}
      <div className="border-t border-white/10 mb-8" />

      {/* Main Card */}
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-6 text-center">
        
        {/* Emoji */}
        <div className="text-5xl mb-2">🤔</div>

        {/* Headline */}
        <h2 className="text-3xl font-bold text-white mb-4">
          Wait a second...
        </h2>

        {/* Paragraph 1 */}
        <p className="text-white/60 text-lg leading-relaxed mb-4">
          You've solved{' '}
          <span className="text-orange-400 font-bold">{totalCombined} problems</span>
          {' '}across{' '}
          <span className="text-orange-400 font-bold">{accountCount} accounts</span>.
          That's impressive! But here's the thing — what if you solved the same
          problem on multiple accounts? You might be overcounting your progress
          without even knowing it.
        </p>

        {/* Paragraph 2 */}
        <p className="text-white/60 text-lg leading-relaxed mb-8">
          The only way to know your{' '}
          <span className="text-white font-semibold">TRUE unique problem count</span>
          {' '}is to connect your accounts securely. Your session cookies never
          leave your browser.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
        >
          Find My Unique Count 🔍
        </button>

        {/* Security note */}
        <p className="text-white/30 text-sm mt-4">
          🔒 Your cookies are never stored or sent to our servers
        </p>

      </div>
      {showModal && (
  <UniqueModal
    accounts={accounts}
    onClose={() => setShowModal(false)}
  />
)}
    </div>
  )
}