import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = (err) => {
  console.log(`${chalk.bgRed.blackBright(' ERROR ')} ${err}`)
}

const printSuccess = (mes) => {
  console.log(`${chalk.bgGreen.blackBright(' SUCCESS ')} ${mes}`)
}

const printHelp = () => {
  console.log(
    dedent`${chalk.bgBlue.blackBright(' HELP ')}
    Без параметров - выводв погоды
    -s [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    `
  )
}

const printWeather = (res, icon) => {
  console.log(
    dedent`${chalk.bgMagenta.blackBright(' WEATHER ')} Погода в городе ${
      res.name
    }
    ${icon}  ${res.weather[0].description}
    Температура: ${res.main.temp} (ощушается как ${res.main.feels_like})
    Влажность: ${res.main.humidity}%
    Скорость ветра: ${res.wind.speed}
    `
  )
}

export { printError, printSuccess, printHelp, printWeather }
