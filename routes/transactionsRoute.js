const express = require('express')
const { addTransaction, getAllTransaction, editTransaction } = require('../controllers/transactionCntroller')

// router object
const router = express.Router()

router.post('/addtransaction', addTransaction)
router.post('/gettransaction', getAllTransaction)
router.post('/edittransaction', editTransaction)


module.exports = router;