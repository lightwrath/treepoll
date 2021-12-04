import { fetchServerUnixTime, fetchServerEvents } from "../api/sequence"

let sequenceData
let cachedEventList = []
let queuedTrigger
let unixTimeOffset = 0

export async function initialiseEngine(sessionId, sequenceImport) {
  sequenceData = sequenceImport
  const serverTime = await fetchServerUnixTime()
  unixTimeOffset = serverTime - Date.now()
  serverEventsCycle(sessionId)
  return sequenceData.default
}

function serverEventsCycle(sessionId) {
  setInterval(async () => {
    const updatedList = await fetchServerEvents(sessionId)
    if (cachedEventList.length !== updatedList.length) {
      cachedEventList = updatedList
      queuedTrigger = cachedEventList[0].id
      evaluateTriggers()
    }
  }, 10000)
}

function evaluateTriggers() {
  Object.keys(sequenceData).forEach(key => {
    console.log(sequenceData[key])
    console.log(queuedTrigger)
    if (sequenceData[key].triggers && sequenceData[key].triggers.includes(queuedTrigger)) {
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
