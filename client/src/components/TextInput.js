import React from 'react'
import { Input } from "@rebass/forms"
import config from "../config"

export default function TextInput({ name, placeholder, style, value, onChange }) {
  return (
    <Input
      sx={{
        color: config.action,
        borderRadius: "5px",
        ':hover': {
          color: config.highlight
        },
        ...style
      }}
      id={name}
      name={name}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target)}
    />
  )
}
