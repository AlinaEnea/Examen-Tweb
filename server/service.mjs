import Sequelize from 'sequelize'
import { Meeting, Participant } from './repository.mjs'

async function getMeetings(request, response) {
  try {
    const meetings = await Meeting.findAll()
    if (meetings.length > 0) {
      response.status(200).json(meetings)
    } else {
      response.status(204).send()
    }
  } catch (error) {
    response.status(500).json(error)
  }
}

async function getMeeting(request, response) {
  try {
    if (request.params.id) {
      const meeting = await Meeting.findByPk(request.params.id)
      if (meeting) {
        response.json(meeting)
      } else {
        response.status(404).send()
      }
    } else {
      response.status(400).send()
    }
  } catch (error) {
    response.status(500).json(error)
  }
}

async function addMeeting(request, response) {
  try {
    if (request.body.descriere && request.body.url && request.body.data) {
      await Meeting.create(request.body)
      response.status(201).send()
    } else {
      response.status(400).send()
    }
  } catch (error) {
    response.status(500).json(error)
  }
}

async function saveMeeting(request, response) {
  try {
    const meeting = await Meeting.findByPk(request.params.id)
    if (meeting) {
      Object.entries(request.body).forEach(([name, value]) => (meeting[name] = value))
      await meeting.save()
      response.status(204).send()
    } else {
      response.status(404).send()
    }
  } catch (error) {
    response.status(500).json(error)
  }
}

async function removeMeeting(request, response) {
  try {
    if (request.params.id) {
      const meeting = await Meeting.findByPk(request.params.id)
      if (meeting) {
        await meeting.destroy()
        response.status(204).send()
      } else {
        response.status(404).send()
      }
    } else {
      response.status(400).send()
    }
  } catch (error) {
    response.status(500).json(error)
  }
}

async function getParticipants(request, response) {
  try {
    const participants = await Participant.findAll()
    if (participants.length > 0) {
      response.status(200).json(participants)
    } else {
      response.status(204).send()
    }
  } catch (error) {
    response.status(500).json(error)
  }
}

async function getParticipant(request, response) {
  try {
    if (request.params.id) {
      const participant = await Participant.findByPk(request.params.id)
      if (participant) {
        response.json(participant)
      } else {
        response.status(404).send()
      }
    } else {
      response.status(400).send()
    }
  } catch (error) {
    response.status(500).json(error)
  }
}

async function addParticipant(request, response) {
  try {
    if (request.body.nume) {
      await Participant.create(request.body)
      response.status(201).send()
    } else {
      response.status(400).send()
    }
  } catch (error) {
    response.status(500).json(error)
  }
}

async function saveParticipant(request, response) {
  try {
    const participant = await Participant.findByPk(request.params.id)
    if (participant) {
      Object.entries(request.body).forEach(([name, value]) => (participant[name] = value))
      await participant.save()
      response.status(204).send()
    } else {
      response.status(404).send()
    }
  } catch (error) {
    response.status(500).json(error)
  }
}

async function removeParticipant(request, response) {
  try {
    if (request.params.id) {
      const participant = await Participant.findByPk(request.params.id)
      if (participant) {
        await participant.destroy()
        response.status(204).send()
      } else {
        response.status(404).send()
      }
    } else {
      response.status(400).send()
    }
  } catch (error) {
    response.status(500).json(error)
  }
}

export {
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
}
