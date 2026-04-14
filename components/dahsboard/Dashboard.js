'use client'

import AccountsStatsCard from '@/components/dahsboard/AccountsStatsCard';
import EngagementSection from '@/components/dahsboard/EngagementSection';
import TotalSummaryBar from '@/components/dahsboard/TotalSummaryBar';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';






export default function Dashboard(){

    const [results,setResults]=useState([]);
    const [loading,setLoading] =useState(true)
    const[err,setErr]=useState("");
    const searchParams=useSearchParams();
    const router=useRouter();

    useEffect(()=>{
        const fetchData=async()=>{
            const query=searchParams.get('users');
            if(!query) router.back();
        console.log(query)

        const usernames = query.split(',')
const responses = await Promise.all(
  usernames.map(u => fetch(`/api/leetcode?username=${u}`).then(r => r.json()))
)

console.log(responses);
setResults(responses);
setLoading(false)

        }
        fetchData()
        
    },[searchParams,router])

    if(loading) return <div>Loading..</div>
    return (

        <div >
        <div className="grid grid-cols-1 mt-5 ml-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {results.map((account) => (
          <AccountsStatsCard key={account.username} {...account} />
        ))}
       
      </div>

      <TotalSummaryBar totalCombined={results.reduce((sum, acc) => sum + acc.total, 0)} easyTotal={results.reduce((sum, acc) => sum + acc.easy, 0)} mediumTotal={results.reduce((sum, acc) => sum + acc.medium, 0)} hardTotal={results.reduce((sum, acc) => sum + acc.hard, 0)} accountCount={results.length}/>
 
     { results.length>1 &&( <EngagementSection
      totalCombined={results.reduce((sum, acc) => sum + acc.total, 0)}
      accountCount={results.length}
      accounts={results.map(r => r.username)}
    />)
     }
      
      </div>
    )
}

