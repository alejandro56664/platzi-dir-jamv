'use strict'

const { MongoClient } = require('mongodb')
const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env
// const mongoUrl = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
const mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
let connection

async function connectDB () {
  if(connection) return connection
  let client 
  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true
    })
    connection = client.db(DB_NAME)
  } catch (error) {
    console.error('No se pudo conectar a la db', mongoUrl, error)
    process.exit(1)
  }
  return connection

}

module.exports = connectDB