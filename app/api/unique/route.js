import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()
  const accounts = body.accounts

  if (!accounts || Object.keys(accounts).length === 0) {
    return NextResponse.json({ error: 'No accounts provided' }, { status: 400 })
  }

  try {
    const allAccountProblems = []

    for (const [username, cookie] of Object.entries(accounts)) {
      const problems = await fetchAllSolvedProblems(cookie)
      allAccountProblems.push({ username, problems })
    }

    // Build problem map across all accounts
    const problemMap = {}

    for (const account of allAccountProblems) {
      for (const problem of account.problems) {
        if (!problemMap[problem.id]) {
          problemMap[problem.id] = {
            id: problem.id,
            title: problem.title,
            difficulty: problem.difficulty,
            solvedBy: []
          }
        }
        if (!problemMap[problem.id].solvedBy.includes(account.username)) {
          problemMap[problem.id].solvedBy.push(account.username)
        }
      }
    }

    const allProblems = Object.values(problemMap)
    const duplicates = allProblems.filter(p => p.solvedBy.length > 1)

    return NextResponse.json({
      uniqueCount: allProblems.length,
      duplicateCount: duplicates.length,
      easy: allProblems.filter(p => p.difficulty === 'Easy').length,
      medium: allProblems.filter(p => p.difficulty === 'Medium').length,
      hard: allProblems.filter(p => p.difficulty === 'Hard').length,
      duplicates: duplicates,
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

async function fetchAllSolvedProblems(cookie) {
  const response = await fetch('https://leetcode.com/api/problems/all/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://leetcode.com',
      'User-Agent': 'Mozilla/5.0',
      'Cookie': `LEETCODE_SESSION=${cookie}`
    }
  })

  if (!response.ok) {
    throw new Error('Invalid cookie or session expired')
  }

  const data = await response.json()

  // Filter only solved problems (status === "ac")
  const solvedProblems = data.stat_status_pairs
    .filter(p => p.status === 'ac')
    .map(p => ({
      id: p.stat.question_id,
      title: p.stat.question__title,
      difficulty:
        p.difficulty.level === 1 ? 'Easy' :
        p.difficulty.level === 2 ? 'Medium' : 'Hard'
    }))

  return solvedProblems
}