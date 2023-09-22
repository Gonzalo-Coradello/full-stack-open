import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useState } from 'react'
import Select from 'react-select'

const Authors = props => {
  const { data, loading } = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const [name, setName] = useState(null)
  const [year, setYear] = useState('')

  if (loading) {
    return <div>loading...</div>
  }

  const authors = data.allAuthors
  const options = authors.map(author => ({
    value: author.name,
    label: author.name,
  }))

  console.log(options)

  const updateAuthor = e => {
    e.preventDefault()

    editAuthor({ variables: { name: name.value, setBornTo: +year } })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <div>
          name <Select onChange={setName} options={options} />
        </div>
        <div>
          born{' '}
          <input
            type='number'
            value={year}
            onChange={e => setYear(e.target.value)}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  )
}

export default Authors
