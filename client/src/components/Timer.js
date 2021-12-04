import React, { useState, useEffect, useRef } from 'react'

export default function Timer({ startingSeconds }) {
  const [time, setTime] = useState()
  const secondsTimer = useRef()
  
  useEffect(() => {
    setTime(startingSeconds)
    secondsTimer.current = setInterval(() => setTime(prevTime => prevTime - 1), 1000)
  }, [startingSeconds])

  useEffect(() => {
    if (time <= 0) clearInterval(secondsTimer.current)
  }, [time])

  return (
    <div>
      {time}
    </div>
  )
}
