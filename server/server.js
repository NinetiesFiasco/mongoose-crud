require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(
  process.env.MONGO_URL,
  {useNewUrlParser: true},
  () => {console.log('Mongoose connected')},
  e=>console.error(e)
)

const {humans} = require('./api')


const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const port = process.env.VUE_APP_SERVER_PORT || 3000 

app.use(express.static(path.join(__dirname, '..', 'dist') ))
app.use(express.static(path.join(__dirname, '..', 'public') ))

app.use('/api/humans', humans)

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})