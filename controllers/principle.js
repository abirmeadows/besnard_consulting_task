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

    const principle = await Principle.create({ body })

    res.json(principle)
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

    const principle = await Principle.findOne({ where: { uuid } })

    if (!principle) return res.status(404).json({ msg: 'Principle not found' })

    await principle.destroy()

    res.json({ msg: 'Principle deleted!' })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const { body } = req.body
    const { uuid } = req.params

    const principle = await Principle.findOne({ where: { uuid } })

    if (!principle) return res.status(404).json({ msg: 'Principle not found' })

    principle.body = body

    await principle.save()

    res.json(principle)
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

module.exports = {
  getAll,
  create,
  destroy,
  update,
}
