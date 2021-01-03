const { sequelize } = require('./models')
const server = require('./server')

const PORT = process.env.PORT || 5000

server.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`)

  await sequelize.authenticate()

  console.log('DB connected')
})
