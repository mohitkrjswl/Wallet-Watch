const express = require('express')
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require('../controllers/transactionCntroller')

// router object
const router = express.Router()

router.post('/addtransaction', addTransaction)
router.post('/gettransaction', getAllTransaction)
router.post('/edittransaction', editTransaction)
router.post('/deletetransaction', deleteTransaction)


module.exports = router;