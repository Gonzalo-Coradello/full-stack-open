import axios from 'axios'
const geoUrl = (city) => `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
const currentUrl = (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`

const getWeather = (city) => {
    return axios.get(geoUrl(city))
        .then(res => axios.get(currentUrl(res.data[0].lat, res.data[0].lon)))
        .then(res => res.data)
}

export default getWeather