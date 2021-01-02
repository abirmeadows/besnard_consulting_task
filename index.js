const express = require('express')
const { sequelize } = require('./models')

const app = express()

app.use(express.json())

app.use('/value', require('./routes/value'))
app.use('/principle', require('./routes/principle'))

const PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`)

  await sequelize.authenticate()

  console.log('DB connected')
})
