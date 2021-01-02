const express = require('express')
const { getAll } = require('../controllers/value')

const router = express()

router.get('/all', getAll)

module.exports = router
