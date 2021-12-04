import React from 'react'
import { Button as RebassButton } from 'rebass'
import config from "../config"

export default function Button({ style, onClick, children }) {
  return (
    <RebassButton
      sx={{
        backgroundColor: config.action,
        ':hover': { backgroundColor: config.highlight },
        ...style
      }}
      onClick={onClick}
    >
      {children}
    </RebassButton>
  )
}
