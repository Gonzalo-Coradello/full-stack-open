const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.set('strictQuery', false)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
