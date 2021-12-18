const EventEmitter = require('events')
const sessionList = {}
setInterval(() => console.info(new Date().toISOString(), JSON.stringify(sessionList, undefined, 2)), 60000)
const eventHub = new EventEmitter()

let unixTimeOffset = 0

function initialise() {
  return eventHub
}

function addSession(config, id) {
  sessionList[id] = {
    config,
    feed: []
  }
  addToFeed(config.default, id)
}

function addToFeed(event, id) {
  const prevFeed = sessionList[id].feed[0]
  function getStartTime() {
    if (prevFeed && prevFeed.endTime) return prevFeed.endTime
    return Date.now()
  }
  function getEndTime() {
    if (event.time) return getStartTime() + (event.time * 1000)
    if (event.type === "button") return Date.now()
    return null
  }
  sessionList[id].feed = [
    {
      ...event,
      startTime: getStartTime(),
      endTime: getEndTime()
    },
    ...sessionList[id].feed
  ]
  if (getEndTime()) activeFeedMonitor(id)
}

function activeFeedMonitor(id) {
  function triggerFunction() {
    if (activeFeed.trigger) processTrigger(activeFeed.trigger, id)
  }
  const activeFeed = sessionList[id].feed[0]
  if (activeFeed.endTime) {
    const msRemaining = activeFeed.endTime - Date.now()
    if (msRemaining > 0) {
      setTimeout(triggerFunction, msRemaining)
    } else {
      triggerFunction()
    }
  }
}

function processTrigger(trigger, id) {
  const configSegmentTriggered = sessionList[id].config[trigger]
  addToFeed(configSegmentTriggered, id)
}

module.exports = { initialise, addSession, addToFeed }
