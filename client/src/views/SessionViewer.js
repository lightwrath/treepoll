import React, { useState, useEffect } from 'react'
import WindowHeader from "../components/WindowHeader"
import PollingSegment from "../components/PollingSegment"
import { fetchSequenceData } from "../api/sequence"
import { initialiseEngine } from "../utils/sequenceEngine"

export default function SessionViewer() {
  const [sequenceFeed, setSequenceFeed] = useState([])

  useEffect(() => {
    async function startSequenceEngine() {
      const sequence = await fetchSequenceData()
      setSequenceFeed([await initialiseEngine(sequence)])
      document.body.addEventListener("sequenceEngine", event => setSequenceFeed(prev => [ event.detail, ...prev ]))
    }
    startSequenceEngine()
  }, [])

  if (sequenceFeed.length === 0) return (
    <div>
      loading...
    </div>
  )

  return sequenceFeed.map(segment => {
    if (segment.type === "poll") return (
      <div style={{width: "800px"}}>
        <PollingSegment
          segmentData={segment}
        />
      </div>
    )
    return (
      <div style={{width: "800px"}}>
        <WindowHeader titleText={segment.title}/>
        <p>{segment.description}</p>
      </div>
    )
  })
}
