import React from 'react'
import { useState } from 'react'
import './App.css'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(8).fill(0))
  const mostVoted = votes.indexOf(Math.max(...votes))

  const handleRandom = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <>
      <h1>Anecdotes</h1>
      <h2>Quote of the day</h2>
      <div>
        <h3>{anecdotes[selected]}</h3>
        <p>has {votes[selected]} votes</p>
        <button onClick={handleVote}>Vote</button>
        <button onClick={handleRandom}>Next quote</button>
      </div>
      { votes.some(v => v !== 0) &&
      <div>
        <h2>Most voted</h2>
        <h3>{ anecdotes[mostVoted] }</h3>
        <p>has { votes[mostVoted] } votes</p>
      </div>
      }
    </>
  )
}

export default App