import React, { useState } from 'react'
import WindowHeader from "../components/WindowHeader"
import Button from "./Button"
import config from "../config"
import Timer from "../components/Timer"
import { clientReturnChannel } from "../utils/sessionEngine"

export default function PollingSegment({ segmentData }) {
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <WindowHeader titleText={segmentData.title}/>
      <p>{segmentData.description}</p>
      {segmentData.options && (
        <div>
          {segmentData.options.map(option => (
            <Button
              key={option}
              style={{
                ...(selected === option && { backgroundColor: config.highlight }),
                margin: "20px 0px",
                width: '100%',
                display: 'block'
              }}
              onClick={event => setSelected(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      )}
      <Timer 
        unixStopTime={segmentData.uxStop || 0} 
        onEnd={async () => await clientReturnChannel(segmentData.id + " " + selected)}
      />
    </div>
  )
}
