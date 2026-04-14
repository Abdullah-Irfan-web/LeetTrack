

export default function TotalSummaryBar({ totalCombined, easyTotal, mediumTotal, hardTotal, accountCount }) {
    return (
      <div className="mb-10 mt-8 p-6">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-white mb-6">
          Combined Stats 
          <span className="text-white/40 text-lg font-normal ml-2">
            across {accountCount} account{accountCount > 1 ? 's' : ''}
          </span>
        </h2>
  
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Total */}
          <div className="bg-orange-400/10 border border-orange-400/20 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-orange-400">{totalCombined}</p>
            <p className="text-white/60 text-sm mt-2">Total Problems</p>
            <p className="text-white/30 text-xs mt-1">across {accountCount} accounts</p>
          </div>
  
          {/* Easy */}
          <div className="bg-green-400/10 border border-green-400/20 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-green-400">{easyTotal}</p>
            <p className="text-white/60 text-sm mt-2">Easy Solved</p>
          </div>
  
          {/* Medium */}
          <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-yellow-400">{mediumTotal}</p>
            <p className="text-white/60 text-sm mt-2">Medium Solved</p>
          </div>
  
          {/* Hard */}
          <div className="bg-red-400/10 border border-red-400/20 rounded-xl p-6 text-center">
            <p className="text-4xl font-bold text-red-400">{hardTotal}</p>
            <p className="text-white/60 text-sm mt-2">Hard Solved</p>
          </div>
  
        </div>
      </div>
    )
  }