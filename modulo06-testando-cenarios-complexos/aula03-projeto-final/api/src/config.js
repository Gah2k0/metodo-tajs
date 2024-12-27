import { randomUUID } from 'node:crypto'

const randomName = randomUUID().slice(0, 4)

const dbUser = process.env.DB_USER || 'admin'
const dbPassword = process.env.DB_PASSWORD || 'secret'
const dbHost = process.env.DB_HOST || 'localhost'
const dbPort = process.env.DB_PORT || '27017'
const dbName = process.env.DB_NAME || `${randomName}-test`

const config = {
    dbName,
    collection: 'customers',
    dbURL: `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}`
}

export default config