import { demoSequence, demoServerUnitTime, demoServerSignals } from "../utils/demoData"
import { getSessionId } from "../utils/generalUtils"

let isDemoMode = false

export async function fetchSequenceData() {
  if (getSessionId() === "demo") {
    isDemoMode = true
    return demoSequence
  }
  const response = await fetch(`/session/${getSessionId()}/all`)
  return response.json()
}

export async function fetchServerUnixTime() {
  if (isDemoMode) return demoServerUnitTime
  const response = await fetch('/time')
  return response.text()
}

export async function fetchSignals() {
  if (getSessionId() === "demo") return demoServerSignals()
}

export async function postSelection(event) {
  if (getSessionId() === "demo") return demoServerSignals(event)
}
