#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getIcon, getWeather } from './services/api.service.js'
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'

const saveToken = async (token) => {
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess('Токен сохранен')
    if (!token.length) {
      printError('Не передан токен')
    }
  } catch (err) {
    printError(err.message)
  }
}

const saveCity = async (city) => {
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city)
    printSuccess('Город сохранен')
    if (!city.length) {
      printError('Не передан город')
    }
  } catch (err) {
    printError(err.message)
  }
}

const getForecast = async () => {
  try {
    const weather = await getWeather()
    printWeather(weather, getIcon(weather.weather[0].icon))
  } catch (err) {
    if (err?.response?.status == 404) {
      printError('Не верный город')
    } else if (err?.response?.status == 401) {
      printError('Неверно указан токен')
    } else {
      printError(err.message)
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)
  if (!!args.h) {
    return printHelp()
  }
  if (!!args.s) {
    return saveCity(args.s)
  }
  if (!!args.t) {
    return saveToken(args.t)
  }
  return getForecast()
}

initCLI()
