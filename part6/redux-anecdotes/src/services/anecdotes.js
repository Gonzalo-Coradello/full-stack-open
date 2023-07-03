import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getByID = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async content => {
  const anecdote = {
    content,
    votes: 0,
  }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async (id, data) => {
  const response = await axios.put(`${baseUrl}/${id}`, data)
  return response.data
}

const addVote = async id => {
  const anecdote = await getByID(id)
  const data = {
    ...anecdote,
    votes: anecdote.votes + 1
  }

  const updatedAnecdote = await update(id, data)
  return updatedAnecdote
}

export default { getAll, create, addVote }
