const Search = ({ search, handleChange }) => {
  return (
    <div>
      Find countries: <input type="text" value={search} onChange={(e) => handleChange(e)} />
    </div>
  )
}

export default Search
