'use strict'

const connectDB = require('./db')


module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }

    const newCourse = Object.assign(defaults, input)
    let db
    let course
    try {
      db = await connectDB()
      course = await db.collection('courses').insertOne(input)
      input._id = course.insertedId
    } catch (error) {
      console.log(error)
    }
  }
}