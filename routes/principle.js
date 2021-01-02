const express = require('express')
const { getAll, create, destroy } = require('../controllers/principle')

const router = express()

router.get('/all', getAll)
router.post('/', create)
router.delete('/:uuid', destroy)

module.exports = router
