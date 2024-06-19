import pkg from 'pg'

const { Pool } = pkg

const configDB = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  allowExitOnIdle: true
}

const poolDB = new Pool(configDB)

const linkDB = async (query, values) => {
  try {
    const { rows } = await poolDB.query(query, values)
    return rows
  } catch (err) {
    const { code, message } = err
    const error = { status: false, code, message }
    throw error
  }
}

export default linkDB
