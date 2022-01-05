import axios from 'axios'
// import https from 'https'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case '01':
      return '☀️'
    case '02':
      return '🌤️'
    case '03':
      return '☁️'
    case '04':
      return '☁️'
    case '09':
      return '🌧️'
    case '10':
      return '🌦️'
    case '11':
      return '🌩️'
    case '13':
      return '❄️'
    case '50':
      return '🌫️'
  }
}

const getWeather = async () => {
  const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token))
  const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city))
  if (!token) {
    throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
  }
  if (!city) {
    throw new Error('Не задан город, задайте его через команду -s [CITY]')
  }
  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: city,
        appid: token,
        lang: 'ru',
        unit: 'metric',
      },
    }
  )
  return data
  // const url = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
  // const url = new URL('https://api.openweathermap.org/data/2.5/weather')
  // url.searchParams.append('q', city)
  // url.searchParams.append('appid', token)
  // url.searchParams.append('lang', 'ru')
  // url.searchParams.append('units', 'metric')
  // https.get(url, (res) => {
  //   let response = ''
  //   res.on('data', (chunk) => {
  //     response += chunk
  //   })
  //   res.on('end', () => {
  //     console.log(response)
  //   })
  // })
}

export { getWeather, getIcon }
