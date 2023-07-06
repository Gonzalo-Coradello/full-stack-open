import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

export const getCountry = async name => {
  try {
    const response = await axios.get(`${baseUrl}/${name}`)
    return { data: response.data, found: true }
  } catch (error) {
    return { status: 'error', error, found: false }
  }
}
