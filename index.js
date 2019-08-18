'use strict'

require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const app = express()
const port = process.env.port || 1100
// configurar los resolvers
const resolvers = require('./lib/resolvers')

// definiendo el esquema
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),   
  'utf-8'
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers

})


app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers
}))

app.listen(port, () => {
  console.log(`El servidor esta escuchando en el puerto ${ port }`)
})