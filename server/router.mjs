import express from 'express'
import {
  getMeetings,
  getMeeting,
  addMeeting,
  saveMeeting,
  removeMeeting,
  getParticipants,
  getParticipant,
  addParticipant,
  saveParticipant,
  removeParticipant
} from './service.mjs'

const router = express.Router()

router
  .route('/meetings')
  .get((request, response) => getMeetings(request, response))
  .post((request, response) => addMeeting(request, response))

router
  .route('/meetings/:id')
  .get((request, response) => getMeeting(request, response))
  .patch((request, response) => saveMeeting(request, response))
  .delete((request, response) => removeMeeting(request, response))

router
  .route('/participants')
  .get((request, response) => getParticipants(request, response))
  .post((request, response) => addParticipant(request, response))

router
  .route('/participants/:id')
  .get((request, response) => getParticipant(request, response))
  .patch((request, response) => saveParticipant(request, response))
  .delete((request, response) => removeParticipant(request, response))

export default router
