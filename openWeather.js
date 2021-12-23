const { prop, curry, path, compose, converge, zip, map, multiply } = require('ramda')
const { toFixed, KtoF, taskToPromise, getData, timeStampToDate } = require('./utils')
const apiKey = require('./apikey')

// getOpenWeatherUrl :: zipcode:string => url:string
const getOpenWeatherUrl = zipcode =>
  `http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&appid=${apiKey}`

const getTimestamp = prop('dt')

const getTemp = path(['main', 'temp'])


// getDayTimeAndTemp :: zipcode:string => [daytime, fahrenheit]
const getDayTimeAndTemp_ = compose(
  converge(
    zip,
    [
      map(compose(
        timeStampToDate,
        multiply(1000),
        getTimestamp)
      ),
      map(compose(
        toFixed(2),
        KtoF,
        getTemp)
      )
    ]
  ),
  path(['data', 'list'])
)

const getTimestampAndTemp = compose(
  converge(
    zip,
    [
      map(getTimestamp),
      map(getTemp)
    ]
  ),
  path(['data', 'list'])
)
module.exports = {
  // zipcode => Promise<wheatherData>
  fetchByZipcode:
    compose(
      taskToPromise,
      getData,
      getOpenWeatherUrl
    ),
  // zipcode => Promise<daytime & temp> 
  fetchTimestrampAndTemperatureByZipcode:
    compose(
      taskToPromise,
      map(getTimestampAndTemp),
      getData,
      getOpenWeatherUrl
    ),
  // zipcode => openweather url
  getUrl: getOpenWeatherUrl,
}