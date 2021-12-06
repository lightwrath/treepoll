import { fetchSequenceData, fetchServerUnixTime, fetchSignals, postSelection } from "../api/sequence"
import { getSessionId } from "../utils/generalUtils"

const sessionData = {
  config: {},
  feed: [],
  signals: []
}
let queuedTrigger
let unixTimeOffset = 0


export async function initialiseEngine(sequenceImport) {
  function parseSequenceData(sequence) {
    const parsedSequence = sequence
    Object.keys(parsedSequence).forEach(key => {
      parsedSequence[key].id = key
    })
    return parsedSequence
  }
  sessionData.config = parseSequenceData(await fetchSequenceData(getSessionId))
  pushToFeed(sessionData.config.default)
  console.log("Set initial session config", sessionData)
  const serverTime = await fetchServerUnixTime()
  unixTimeOffset = serverTime - Date.now()
  console.log("Unix time offset for server is", unixTimeOffset)
  setInterval(async () => {
    console.log("Checking server events")
    handleIncomingSignals(await fetchSignals(getSessionId()))
  }, 10000)
  return sessionData.config
}

export async function clientReturnChannel(event) {
  console.log("User returned results", event)
  const resultsFromServer = await postSelection(event)
  console.log("DEBUG", resultsFromServer)
  sessionData.feed[0].result = resultsFromServer[0].details
  handleIncomingSignals(resultsFromServer)
}

function handleIncomingSignals(newSignals) {
  if (sessionData.signals.length !== newSignals.length) {
    console.log("New signals found", newSignals)
    sessionData.signals = newSignals
    queuedTrigger = sessionData.signals[0].eventId
    evaluateTriggers()
  }
}

function evaluateTriggers() {
  Object.keys(sessionData.config).forEach(key => {
    if (sessionData.config[key].triggers && sessionData.config[key].triggers.includes(queuedTrigger)) {
      console.log("Triggering", sessionData.config[key])
      pushToFeed(sessionData.config[key])
      queuedTrigger = null
      return sessionData[key]
    }
  })
}

function pushToFeed(configSegment) {
  function shareFeedWithClient() {
    const event = new CustomEvent("sessionFeed", {
      detail: sessionData.feed
    })
    document.body.dispatchEvent(event)
  }
  sessionData.feed = [
    {
      ...configSegment,
      uxStart: Date.now() + unixTimeOffset,
      uxStop: Date.now() + (configSegment.time * 1000) + unixTimeOffset,
      uid: configSegment.id + sessionData.feed.length
    },
    ...sessionData.feed
  ]
  shareFeedWithClient()
}
