import { demoSequence, demoServerUnitTime, demoServerEvents } from "../utils/demoData"
import { getSessionId } from "../utils/generalUtils"

let isDemoMode = false

export async function fetchSequenceData() {
  if (getSessionId() === "demo") {
    isDemoMode = true
    return demoSequence
  }
}

export async function fetchServerUnixTime() {
  if (isDemoMode) return demoServerUnitTime
}

export async function fetchServerEvents() {
  if (getSessionId() === "demo") return demoServerEvents()
}

export async function postSelection(event) {
  if (getSessionId() === "demo") return demoServerEvents(event)
}
