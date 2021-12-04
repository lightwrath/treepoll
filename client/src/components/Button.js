import React from 'react'
import { Button as RebassButton } from 'rebass'
import config from "../config"

export default function Button({ style, onClick, children }) {
  return (
    <RebassButton
      bg={config.action}
      sx={{
        ':hover': { backgroundColor: config.highlight },
        ...style
      }}
      onClick={onClick}
    >
      {children}
    </RebassButton>
  )
}
