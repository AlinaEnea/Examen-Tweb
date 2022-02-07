import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './Home'
// import RoomForm from './RoomForm'
// import SessionForm from './SessionForm'
// import SpeakerForm from './SpeakerForm'

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      {/* <Route path='/rooms/:roomId' element={<RoomForm />} />
      <Route path='/sessions/:sessionId' element={<SessionForm />} />
      <Route path='/speakers/:speakerId' element={<SpeakerForm />} /> */}
    </Routes>
  </HashRouter>,
  document.getElementById('root')
)
