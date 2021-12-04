import React, { useState, useEffect, useRef } from 'react'
import WindowHeader from "../components/WindowHeader"
import { fetchSequenceData, fetchServerUnixTime } from "../api/sequence"

export default function SessionViewer() {
  const [sequence, setSequence] = useState(null)

  const unixTimeOffset = useRef()

  useEffect(() => {
    async function handleSequenceFetch() {
      const sessionId = window.location.pathname.split('/')[1]
      setSequence(await fetchSequenceData(sessionId))
    }
    const calculateUnixTimeOffset = async () => {
      const serverTime = await fetchServerUnixTime()
      unixTimeOffset.current = Date.now() - serverTime
    }
    handleSequenceFetch()
    calculateUnixTimeOffset()
  }, [])

  return (
    <div style={{width: "800px"}}>
      <WindowHeader titleText="placeholder" />
      in session
    </div>
  )
}
