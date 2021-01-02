const { Principle } = require('../models')

const getAll = async (req, res) => {
  try {
    const values = await Principle.findAll()

    res.json(values)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
const create = async (req, res) => {
  try {
    const { body } = req.body

    const value = await Principle.create({ body })

    res.json(value)
  } catch (error) {
    console.log(error)

    if (error.name === 'SequelizeValidationError') {
      let errors = error.errors

      errors = errors.map((item) => item.message)

      return res.status(400).json(errors)
    }

    res.status(500).json(error)
  }
}
const destroy = async (req, res) => {
  try {
    const { uuid } = req.params

    const value = await Principle.findOne({ where: { uuid } })

    if (!value) return res.status(404).json({ msg: 'Principle not found' })

    await value.destroy()

    res.json({ msg: 'Principle deleted!' })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports = {
  getAll,
  create,
  destroy,
}
