const openWeather = require('./openWeather')
const { log } = require('./utils')

openWeather
  .fetchTimestrampAndTemperatureByZipcode(78633)
  .then(log)
  .catch(log)