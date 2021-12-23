const { default: axios } = require('axios');
const Task = require('data.task/lib/task');
const { curry, tap } = require('ramda');

const fork = curry(
  (reject, resolve, t) => t.fork(reject, resolve))

const taskToPromise = t =>
  new Promise((resolve, reject) => t.fork(reject, resolve))

const promiseToTask = p =>
  new Task((reject, resolve) => p.then(resolve).catch(reject))

const log = tap(console.log)

const toFixed = curry((decimal, number) =>
  number.toFixed(decimal))

const KtoF = K => (K - 273.15) * 9 / 5 + 32


const timeStampToDate =
  new Intl.DateTimeFormat(
    'en-US',
    { dateStyle: 'full', timeStyle: 'long' })
    .format


// getData :: url:string => JSON:Task
const getData = url =>
  new Task((rej, res) =>
    axios.get(url).then(res).catch(rej)
  )

module.exports = { timeStampToDate, getData, KtoF, fork, taskToPromise, promiseToTask, log, toFixed }
