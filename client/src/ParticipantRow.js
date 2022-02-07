import React from 'react'

function ParticipantRow(props) {
  return (
    <div>
      <div className='nume'>Nume: {props.participant.nume}</div>
    </div>
  )
}

export default ParticipantRow
