const { Value } = require('../models')

const getAll = async (req, res) => {
  try {
    const values = await Value.findAll()

    res.json(values)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports = {
  getAll,
}
