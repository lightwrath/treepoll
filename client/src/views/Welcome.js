import React, { useState } from 'react'
import WindowHeader from '../components/WindowHeader'
import Button from '../components/Button'
import TextInput from '../components/TextInput'

import { demoSequence } from "../utils/demoData"

export default function Welcome() {
  const [sessionId, setSeessionId] = useState("")

  return (
    <div
      style={{
        width: "500px",
      }}
    >
      <WindowHeader titleText="Tree Poll" />
      <p style={{ textAlign: "center", margin: "25px" }}>
        Enter a session ID to join an existing poll or start a new session.
      </p>
      <TextInput
        style={{ width: "200px", margin: "20px auto" }}
        name="sessionId"
        placeholder="Session ID"
        value={sessionId}
        onChange={(e) => setSeessionId(e.value)}
      />
      <Button
        style={{ 
          margin: "20px auto",
          display: "block"
        }}
        onClick={async () => {
          let sessionIdToLaunch = sessionId
          if (!sessionIdToLaunch) {
            const response = await fetch("/session", {
              method: "POST",
              body: JSON.stringify(demoSequence),
              headers: {
                "Content-Type": "application/json"
              }
            })
            sessionIdToLaunch = await response.text()
          }
          window.location.href = "/" + sessionIdToLaunch
        }}
      >
        {sessionId ? "Let's go!" : "New session"}
      </Button>
    </div>
  )
}
