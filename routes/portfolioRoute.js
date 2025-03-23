const express = require('express')
const { SendEmailController } = require('../controllers/portfolioController')

//router object 
const router = express.Router()

//routes
router.post('/sentEmail',SendEmailController)

//export
module.exports = router