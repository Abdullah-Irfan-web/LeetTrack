import { Code2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-6 mt-20">
      <div className="flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <Code2 size={36} className="text-orange-400" />
          <span className="font-bold text-white">LeetTrack</span>
        </div>

        <p className="text-white/40 text-sm ml-2">
          Track your true LeetCode progress
        </p>

        <p className="text-white/40 text-sm">
          Made with ❤️ by <span className="text-white/70">Abdullah</span>
        </p>

      </div>
    </footer>
  )
}