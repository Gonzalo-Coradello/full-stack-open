import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries'

const Recommend = () => {
  const { data: userData, loading } = useQuery(CURRENT_USER)
  const { data, loading: loadingBooks } = useQuery(ALL_BOOKS, {
    variables: { genre: userData?.me?.favoriteGenre },
  })

  if (loading || loadingBooks) {
    return <div>loading...</div>
  }

  const books = data.allBooks
  const favoriteGenre = userData.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
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
    </div>
  )
}

export default Recommend
