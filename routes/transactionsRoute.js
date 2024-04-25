const express = require('express')
const { addTransaction, getAllTransaction } = require('../controllers/transactionCntroller')

// router object
const router = express.Router()

router.post('/addtransaction', addTransaction)
router.post('/gettransaction', getAllTransaction)


module.exports = router;