import React, { useState, useEffect } from 'react'
import WindowHeader from "../components/WindowHeader"
import PollSelection from "../components/PollSelection"
import Timer from "../components/Timer"
import { fetchSequenceData } from "../api/sequence"
import { initialiseEngine } from "../utils/sequenceEngine"

export default function SessionViewer() {
  const [sequenceSegment, setSequenceSegment] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    async function startSequenceEngine() {
      const sessionId = window.location.pathname.split('/')[1]
      const sequence = await fetchSequenceData(sessionId)
      setSequenceSegment(await initialiseEngine(sessionId, sequence))
      document.body.addEventListener("sequenceEngine", event => setSequenceSegment(event.detail))
    }
    startSequenceEngine()
  }, [])

  if (sequenceSegment) return (
    <div style={{width: "800px"}}>
      <WindowHeader titleText={sequenceSegment.title}/>
      <p>{sequenceSegment.description}</p>
      {sequenceSegment.type === "poll" && sequenceSegment.options && (
        <PollSelection
          options={sequenceSegment.options}
          selected={selected}
          onSelection={selection => setSelected(selection)}
        />
      )}
      <Timer startingSeconds={sequenceSegment.time || 0} />
    </div>
  )
  return (
    <div>
      loading...
    </div>
  )
}
