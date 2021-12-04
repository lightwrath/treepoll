import React from 'react'
import Button from "./Button"
import config from "../config"

export default function PollSelection({ options, selected, onSelection }) {
  return (
    <div>
      {Object.keys(options).map(key => (
        <Button
          style={{
            ...(selected === key && { backgroundColor: config.highlight }),
            margin: "20px 0px",
            width: '100%',
            display: 'block'
          }}
          onClick={event => onSelection(key)}
        >
          {options[key]}
        </Button>
      ))}
    </div>
  )
}
