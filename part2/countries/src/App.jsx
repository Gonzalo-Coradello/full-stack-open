import { useEffect } from 'react'
import { useState } from 'react'
import Country from './components/Country'
import List from './components/List'
import Search from './components/Search'
import './App.css'
import countriesService from './services/countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    countriesService.getAll().then(data => setCountries(data))
  }, [])
  
  const handleChange = (e) => {
    const value = e.target.value
    setSearch(value)

    const currentResults = countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))
    setResults(currentResults)

  }

  return (
    <div>
      <h1>Countries information</h1>
      <Search search={search} handleChange={handleChange} />
      {
        results.length > 10 
        ? <p>Too many matches, specify another filter</p> 
        : results.length === 1 
        ? <Country unique={true} country={results[0]} />
        : <List countries={results} /> 
      }
    </div>
  )
}

export default App
