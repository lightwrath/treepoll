import React, { useState, useEffect, useRef } from 'react'

export default function Timer({ startingSeconds, onEnd }) {
  const [time, setTime] = useState(startingSeconds)
  const secondsTimer = useRef()
  
  useEffect(() => {
    secondsTimer.current = setInterval(() => setTime(prevTime => prevTime - 1), 1000)
  }, [])

  useEffect(() => {
    if (time <= 0) {
      clearInterval(secondsTimer.current)
      onEnd()
    }
  }, [time])

  return (
    <div>
      {time}
    </div>
  )
}
