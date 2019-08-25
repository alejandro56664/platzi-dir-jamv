'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

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
      errorHandler(error)
    }
  },
  createPerson: async (root, { input }) => {

    let db
    let student
    try {
      db = await connectDB()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      errorHandler(error)
    }
  },
  editCourse: async (root, { _id, input }) => {
    let db
    let course
    try {
      db = await connectDB()
      await db.collection('courses').updateOne(
        { _id: ObjectID(_id)},
        { $set: input} 
      )
      course = await db.collection('courses').findOne(
        { _id: ObjectID(_id)}
      )
    } catch (error) {
      errorHandler(error)
    }

    return course;
  },
  editPerson: async (root, { _id, input }) => {
    let db
    let student
    try {
      db = await connectDB()
      await db.collection('students').updateOne(
        { _id: ObjectID(_id)},
        { $set: input} 
      )
      student = await db.collection('students').findOne(
        { _id: ObjectID(_id)}
      )
    } catch (error) {
      errorHandler(error)
    }

    return student;
  },
  addPerson: async (root, { courseID, personID}) => {
    let db
    let person
    let course
    try {
      db = await connectDB()
      course = await db.collection('courses').findOne(
        { _id: ObjectID(courseID)}
      )
      person = await db.collection('students').findOne(
        { _id: ObjectID(personID)}
      )

      //validar si exiten ambos
      if(!course || !person) {
        throw new Error("No la persona o el curso no existe")
      }

      //actualizamos
      await db.collection('courses').updateOne(
        { _id: ObjectID(courseID) },
        { $addToSet: { people: ObjectID(personID)} }
        )
    } catch (error) {
      console.log(error)
    }

    return course;
  }

}