import { demoSequence, demoServerUnitTime, demoServerEvents } from "../utils/demoData"

let isDemoMode = false

export async function fetchSequenceData(sessionId) {
  if (sessionId === "demo") {
    isDemoMode = true
    return demoSequence
  }
}

export async function fetchServerUnixTime() {
  if (isDemoMode) return demoServerUnitTime
}

export async function fetchServerEvents(sessionId) {
  if (sessionId === "demo") return demoServerEvents()
}
