import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_BOOKS_GENRES } from '../queries'
import { useState } from 'react'

const Books = props => {
  const [genre, setGenre] = useState(null)

  const { data: bookGenres, loading: loadingBookGenres } =
    useQuery(ALL_BOOKS_GENRES)
  const { data, loading } = useQuery(ALL_BOOKS, { variables: { genre } })

  if (loading || loadingBookGenres) {
    return <div>loading...</div>
  }

  const books = data.allBooks

  const genres = bookGenres.allBooks
    .flatMap(book => book.genres)
    .filter((item, idx, arr) => arr.indexOf(item) === idx)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map(genre => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
