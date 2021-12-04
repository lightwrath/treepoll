import React from "react"
import config from "../config"

export default function AppMainWindow({children}) {
  return (
    <div
      style={{
        backgroundColor: config.background,
        padding: "10px 50px",
        borderRadius: "10px"
      }}
    >
      {children}
    </div>
  )
}
