const express = require('express')
const { addTransaction, getAllTransaction } = require('../controllers/transactionCntroller')

// router object
const router = express.Router()

router.post('/add-transaction', addTransaction)
router.get('/get-transaction', getAllTransaction)


module.exports = router