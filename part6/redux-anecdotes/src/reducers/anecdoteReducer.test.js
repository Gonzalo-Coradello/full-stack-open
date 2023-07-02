import reducer from "./anecdoteReducer";

describe('anecdote reducer', () => {
  test('votes are incremented', () => {
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

    const action = {
      type: 'VOTE',
      payload: { id: 1 }
    }

    const newState = reducer(state, action)
    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual({
      content: 'If it hurts, do it more often',
      id: 1,
      votes: 1
    })
  })
})