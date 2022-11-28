const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.post('/', controller.post)
router.get('/', controller.get)
router.get('/random/:count', controller.random)
router.get('/:skip/:limit', controller.readPage)
router.get('/count', controller.count)
router.put('/:id', controller.put)
router.delete('/:id', controller.delete)

module.exports = router