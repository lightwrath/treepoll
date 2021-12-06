import React, { useState, useEffect, useRef } from 'react'

export default function Timer({ unixStopTime, onEnd }) {
  const getTimeInSeconds = () => ((unixStopTime - Date.now()) / 1000).toFixed()

  const [time, setTime] = useState(getTimeInSeconds())
  const secondsTimer = useRef()

  useEffect(() => {
    secondsTimer.current = setInterval(() => setTime(getTimeInSeconds()), 1000)
  }, [])

  useEffect(() => {
    if (time <= 0) {
      clearInterval(secondsTimer.current)
      onEnd()
    }
  }, [time])

  return (
    <div>
      {time > 0 ? time : 0}
    </div>
  )
}
