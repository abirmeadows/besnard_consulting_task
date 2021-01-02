const express = require('express')
const { getAll, create, destroy, update } = require('../controllers/principle')

const router = express()

router.get('/all', getAll)
router.post('/', create)
router.delete('/:uuid', destroy)
router.put('/:uuid', update)

module.exports = router
