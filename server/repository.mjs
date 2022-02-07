import Sequelize from 'sequelize'
import { config } from 'dotenv'

config({})

let sequelize
if (process.env.MODE === 'development') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './repository.db',
    define: {
      timestamps: false
    }
  })
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  })
}

const Meeting = sequelize.define('meeting', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  descriere: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      min: {
        args: [3]
      }
    }
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false
    // validate: {
    //   isDate: true,
    //   isAfter: Date.now()
    // }
  }
})

const Participant = sequelize.define('participant', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nume: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      min: {
        args: [5]
      }
    }
  }
})

Meeting.hasMany(Participant, { foreignKey: 'meetingId' })
Participant.belongsTo(Meeting, { foreignKey: 'meetingId' })

async function initialize() {
  await sequelize.authenticate()
  await sequelize.sync({ alter: true })
}

export { initialize, Meeting, Participant }
