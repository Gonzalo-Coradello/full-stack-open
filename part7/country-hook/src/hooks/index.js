import { useEffect, useState } from 'react'
import { getCountry } from '../components/services/country'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useCountry = name => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      getCountry(name)
        .then(response => {
          setCountry(response)
        })
        .catch(error => error.status === 404 && setCountry({ found: false }))
    }
  }, [name])

  return country
}
