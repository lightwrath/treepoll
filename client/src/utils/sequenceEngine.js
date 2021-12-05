import { fetchServerUnixTime, fetchServerEvents, postSelection } from "../api/sequence"
import { getSessionId } from "../utils/generalUtils"

let sequenceData
let cachedEventList = []
let queuedTrigger
let unixTimeOffset = 0

function parseSequenceData(sequence) { //Could be in another file
  const parsedSequence = sequence
  Object.keys(parsedSequence).forEach(key => {
    parsedSequence[key].id = key
  })
  return parsedSequence
}

export async function initialiseEngine(sequenceImport) {
  sequenceData = parseSequenceData(sequenceImport)
  console.log("Set initial sequence data", sequenceData)
  const serverTime = await fetchServerUnixTime()
  unixTimeOffset = serverTime - Date.now()
  console.log("Unix time offset for server is", unixTimeOffset)
  serverEventsCycle()
  return sequenceData.default
}

export async function clientReturnChannel(event) {
  console.log("User returned results", event)
  handleEventListUpdates(await postSelection(event))
}

function serverEventsCycle() {
  console.log("Server events polling every 10 seconds started")
  setInterval(async () => {
    console.log("Checking server events")
    handleEventListUpdates(await fetchServerEvents(getSessionId()))
  }, 10000)
}

function handleEventListUpdates(serverList) {
  if (cachedEventList.length !== serverList.length) {
    console.log("New events found", serverList)
    cachedEventList = serverList
    queuedTrigger = cachedEventList[0].eventId
    evaluateTriggers()
  }
}

function evaluateTriggers() {
  Object.keys(sequenceData).forEach(key => {
    if (sequenceData[key].triggers && sequenceData[key].triggers.includes(queuedTrigger)) {
      console.log("Triggering", sequenceData[key])
      pushToClientFeed(sequenceData[key])
      queuedTrigger = null
      return sequenceData[key]
    }
  })
}

function pushToClientFeed(content) {
  const event = new CustomEvent("sequenceEngine", {
    detail: content
  })
  document.body.dispatchEvent(event)
}
