
import { NextResponse } from "next/server";

export async function GET(request){
    const {searchParams}=new URL(request.url);
    const username=searchParams.get('username');

    if(!username){
        return NextResponse.json({error:"Username is required"},{status:400})
    }


    const query = `
    query getUserStats($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          realName
          ranking
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `

  try{
    const response=await fetch('https://leetcode.com/graphql',{
        method:'POST',
        headers:{
            'Content-type':'application/json',
            'Referer': 'https://leetcode.com',
            'User-Agent': 'Mozilla/5.0'
        },
        body:JSON.stringify({
            query,
            variables:{
                username
            }
        })
    })
    const data=await response.json()
    if (!data.data.matchedUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
  
      const user = data.data.matchedUser
      const stats = user.submitStatsGlobal.acSubmissionNum
  
      return NextResponse.json({
        username: user.username,
        realName: user.profile.realName,
        ranking: user.profile.ranking,
        total: stats.find(s => s.difficulty === 'All')?.count || 0,
        easy: stats.find(s => s.difficulty === 'Easy')?.count || 0,
        medium: stats.find(s => s.difficulty === 'Medium')?.count || 0,
        hard: stats.find(s => s.difficulty === 'Hard')?.count || 0,
      })
  
  }
  catch(err){
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }

}