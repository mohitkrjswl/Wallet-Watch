const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDb');


dotenv.config();

// Connect to database
connectDb();

// Load env vars
const app = express();
// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())



// Routes
// user routes

app.use('/api/v1/users', require('./routes/userRoute'))
// transaction routes
app.use('/api/v1/transactions', require('./routes/transactionsRoute'))
// port

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})