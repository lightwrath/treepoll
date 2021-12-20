/* sessionEventHub usage:
 * sessionAdd: [config object, session id] - Add a new session or reset a session to a given ID.
 * feedAdd: [config segment key, session id] - Add to feed from config.
 */

const EventEmitter = require('events')
const sessionList = {}
const eventHub = new EventEmitter()

let unixTimeOffset = 0

function initialise(msOffSet) {
  unixTimeOffset = msOffSet || 0
  return eventHub
}

eventHub.on("sessionAdd", (config, id) => {
  sessionList[id] = {
    config,
    feed: []
  }
  log(id, "sessionAdd", sessionList[id], 'info')
  eventHub.emit("feedAdd", config.default, id)
})

eventHub.on("feedAdd", (event, id) => {
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
  log(id, "feedAdd", sessionList[id].feed[0], 'info')
  if (getEndTime()) activeFeedMonitor(id)
})

function activeFeedMonitor(id) {
  const activeFeed = sessionList[id].feed[0]
  function triggerFunction() {
    if (activeFeed.trigger) processTrigger(activeFeed.trigger, id)
  }
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
  eventHub.emit("feedAdd", configSegmentTriggered, id)
}

function log(sessionId, action, payload, trace) {
  if (trace === "info") {
    console.info(`\x1b[34m${sessionId} - ${action}\x1b[0m: `)
    console.log(payload)
  }
}

module.exports = { initialise, sessionList }
