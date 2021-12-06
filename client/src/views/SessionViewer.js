import React, { useState, useEffect } from 'react'
import WindowHeader from "../components/WindowHeader"
import PollingSegment from "../components/PollingSegment"
import { initialiseEngine } from "../utils/sessionEngine"

export default function SessionViewer() {
  const [sequenceFeed, setSequenceFeed] = useState([])

  useEffect(() => {
    async function startSequenceEngine() {
      document.body.addEventListener("sessionFeed", feed => setSequenceFeed(feed.detail))
      await initialiseEngine()
    }
    startSequenceEngine()
  }, [])

  if (sequenceFeed.length === 0) return (
    <div>
      loading...
    </div>
  )

  return sequenceFeed.map(segment => (
    <div style={{width: "800px"}} key={segment.uid}>
      {segment.type === "poll" && (
        <PollingSegment
          segmentData={segment}
        />
      )}
      {!segment.type && (
        <>
          <WindowHeader titleText={segment.title}/>
          <p>{segment.description}</p>
        </>
      )}
    </div>
  ))
}
