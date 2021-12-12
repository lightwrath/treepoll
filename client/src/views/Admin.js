import React, { useState } from 'react'
import WindowHeader from '../components/WindowHeader'
import Textarea from "../components/Textarea"
import Button from "../components/Button"

export default function Admin() {
  const [configInput, setConfigInput] = useState()
  const [sessionId, setSeessionId] = useState()

  return (
    <div style={{ width: "800px" }} >
      <WindowHeader titleText="Admin Interface"/>
      <p>First create the session configuration</p>
      <Textarea
        name="config"
        placeholder="{}"
        onChange={e => setConfigInput(e.value)}
      />
      <Button
        onClick={async () => {
          const validConfig = configInput.replace(/(\r\n|\n|\r)/gm, "")
          console.log(validConfig)
          JSON.parse(validConfig)
          JSON.stringify(validConfig)
          const response = await fetch("/session", {
            method: "POST",
            body: validConfig,
            headers: {
              "Content-Type": "application/json"
            }
          })
          setSeessionId(await response.text())
        }}
      >
        Start Session
      </Button>
      {sessionId}
    </div>
  )
}
