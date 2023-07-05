import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './services/requests'
import { useNotificationDispatch } from './context/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(updateAnecdote, {
    onSuccess: updatedAnecdote => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData(
        'anecdotes',
        anecdotes.map(a => (a.id === updatedAnecdote.id ? updatedAnecdote : a))
      )
    },
  })

  const setNotification = useNotificationDispatch()

  const {
    isLoading,
    isError,
    data: anecdotes,
  } = useQuery('anecdotes', getAnecdotes, {
    retry: 1,
    refetchOnWindowFocus: false,
  })

  const handleVote = anecdote => {
    mutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    setNotification(`you voted '${anecdote.content}'`)
  }

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return (
      <div>anecdote service not available due to problems in the server.</div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
