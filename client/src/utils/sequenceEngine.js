import { fetchServerUnixTime, fetchServerEvents, postSelection } from "../api/sequence"
import { getSessionId } from "../utils/generalUtils"

let sequenceData
let cachedEventList = []
let queuedTrigger
let unixTimeOffset = 0

export async function initialiseEngine(sequenceImport) {
  sequenceData = sequenceImport
  console.log("Set initial sequence data", sequenceData)
  const serverTime = await fetchServerUnixTime()
  unixTimeOffset = serverTime - Date.now()
  console.log("Unix time offset for server is", unixTimeOffset)
  serverEventsCycle()
  return sequenceData.default
}

export async function returnSegmentResult(segment, result) {
  const payload = segment.id + " " + result
  console.log("User returned results", payload)
  const updatedList = await postSelection(payload)
  if (cachedEventList.length !== updatedList.length) {
    console.log("New events found", updatedList)
    cachedEventList = updatedList
    queuedTrigger = cachedEventList[0].eventId
    evaluateTriggers()
  }
}

function serverEventsCycle() {
  console.log("Server events polling every 10 seconds started")
  setInterval(async () => {
    console.log("Checking server events")
    const updatedList = await fetchServerEvents(getSessionId())
    if (cachedEventList.length !== updatedList.length) {
      console.log("New events found", updatedList)
      cachedEventList = updatedList
      queuedTrigger = cachedEventList[0].eventId
      evaluateTriggers()
    }
  }, 10000)
}

function evaluateTriggers() {
  Object.keys(sequenceData).forEach(key => {
    if (sequenceData[key].triggers && sequenceData[key].triggers.includes(queuedTrigger)) {
      console.log("Triggering", sequenceData[key])
      emitEvent(sequenceData[key])
      queuedTrigger = null
      return sequenceData[key]
    }
  })
}

function emitEvent(content) {
  const event = new CustomEvent("sequenceEngine", {
    detail: content
  })
  document.body.dispatchEvent(event)
}
