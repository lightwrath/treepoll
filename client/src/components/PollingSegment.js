import React, { useState } from 'react'
import WindowHeader from "../components/WindowHeader"
import Button from "./Button"
import config from "../config"
import Timer from "../components/Timer"
import { returnSegmentResult } from "../utils/sequenceEngine"

export default function PollingSegment({ segmentData }) {
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <WindowHeader titleText={segmentData.title}/>
      <p>{segmentData.description}</p>
      {segmentData.options && (
        <div>
          {Object.keys(segmentData.options).map(key => (
            <Button
              style={{
                ...(selected === key && { backgroundColor: config.highlight }),
                margin: "20px 0px",
                width: '100%',
                display: 'block'
              }}
              onClick={event => setSelected(key)}
            >
              {segmentData.options[key]}
            </Button>
          ))}
        </div>
      )}
      <Timer 
        startingSeconds={segmentData.time || 0} 
        onEnd={async () => await returnSegmentResult(segmentData, selected)}
      />
    </div>
  )
}
