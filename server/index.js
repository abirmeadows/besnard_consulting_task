const express = require('express')

const app = express()

app.use(express.json())

app.use('/value', require('../routes/value'))
app.use('/principle', require('../routes/principle'))

module.exports = app
