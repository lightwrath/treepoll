import React from "react"
import config from "../config"

export default function WindowHeader({ titleText }) {
  return (
    <h1
      style={{ 
        marginTop: 0,
        textAlign: 'center',
        borderBottom: '1px solid',
        display: "block",
        fontSize: "64px",
        fontWeight: 100,
        fontFamily: "Fredericka the Great",
        color: config.titleText,
      }}
    >
      {titleText}
    </h1>
  )
}
