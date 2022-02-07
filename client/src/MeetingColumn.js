import React, { useState, useEffect } from 'react'
import ParticipantRow from './ParticipantRow'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

function MeetingColumn(props) {
  const navigate = useNavigate()
  const [participants, setParticipants] = useState([])
  const [isShown, setIsShown] = useState(false)
  const [nume, setNume] = useState('')

  const style = {
    width: `${props.width}%`
  }

  const loadParticipants = async (meetingId) => {
    const allParticipants = props.participants
    const participants = allParticipants.filter((p) => p.meetingId === meetingId)
    setParticipants(participants)
  }

  useEffect(() => loadParticipants(props.meeting.id), [props.meeting.id])

  const addParticipant = async (participant) => {
    const response = await fetch('/models/participants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(participant)
    })
    if (response.status === 201) {
      navigate('/')
    }
  }

  const ParticipantForm = (
    <>
      <label>Nume: </label>
      <input placeholder='nume' onChange={(e) => setNume(e.target.value)} />
      <button
        onClick={async () => {
          await addParticipant({
            nume: nume,
            meetingId: props.meeting.id
          })
          setIsShown(false)
        }}
      >
        Save
      </button>
    </>
  )

  return (
    <div className='columns' style={style}>
      <div className='column'>
        <div>{props.meeting.descriere}</div>
        <div>{props.meeting.url}</div>
        <div>{props.meeting.data}</div>
        {participants.length > 0 ? (
          <>
            <div className='participants'>
              Participanti:
              {participants.map((participant, index) => (
                <ParticipantRow participant={participant} index={props.index} key={index} />
              ))}
              {isShown ? (
                <>{ParticipantForm}</>
              ) : (
                <button index={props.index} onClick={() => setIsShown(true)}>
                  Add
                </button>
              )}
            </div>
          </>
        ) : (
          <>{isShown ? <>{ParticipantForm}</> : <button onClick={() => setIsShown(true)}>Add</button>}</>
        )}
      </div>
    </div>
  )
}

export default MeetingColumn
