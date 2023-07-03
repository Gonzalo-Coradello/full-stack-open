import reducer, { voteAnecdote, createAnecdote } from "./anecdoteReducer";

describe('anecdote reducer', () => {

  const state = [
    {
      content: 'If it hurts, do it more often',
      id: 1,
      votes: 0
    },
    {
      content: 'Adding manpower to a late software project makes it later!',
      id: 2,
      votes: 0
    }
  ]

  test('votes are incremented', () => {
    const action = voteAnecdote(1)
    const newState = reducer(state, action)
    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual({
      content: 'If it hurts, do it more often',
      id: 1,
      votes: 1
    })
  })

  test('a new anecdote can be added', () => {
    const action = createAnecdote({
      content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      id: 3,
      votes: 0
    })
    const newState = reducer(state, action)
    expect(newState).toHaveLength(3)
    const anecdotesAtEnd = newState.map(a => a.content)
    expect(anecdotesAtEnd).toContain('Any fool can write code that a computer can understand. Good programmers write code that humans can understand.')
  })
})