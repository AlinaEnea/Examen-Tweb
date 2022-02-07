import React, { useState, useEffect } from 'react'
import MeetingColumn from './MeetingColumn.js'

function Home() {
  const [meetings, setMeetings] = useState([])
  const [participants, setParticipants] = useState([])

  const loadMeetings = async () => {
    const response = await fetch('/models/meetings')
    if (response.status === 200) {
      // setMeetings(await response.json())
      let data = await response.json()
      setMeetings(data)
    }
  }
  const loadParticipants = async () => {
    const response = await fetch('/models/participants')
    if (response.status === 200) {
      // setParticipants(await response.json())
      let data = await response.json()
      setParticipants(data)
    }
  }

  useEffect(() => {
    loadMeetings()
    loadParticipants()
  }, [])

  return (
    <div>
      <div className='container'>
        {meetings.map((meeting, index) => (
          <MeetingColumn
            key={index}
            meeting={meeting}
            participants={participants}
            index={index}
            width={100 / meetings.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
