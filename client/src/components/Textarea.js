import React from 'react'
import { Textarea } from "@rebass/forms"

export default function TextInput({ name, placeholder, style, value, onChange }) {
  return (
    <Textarea
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target)}
    />
  )
}
