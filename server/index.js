const express = require('express')

const app = express()

app.use(express.json())

app.use('/api/value', require('../routes/value'))
app.use('/api/principle', require('../routes/principle'))

module.exports = app
