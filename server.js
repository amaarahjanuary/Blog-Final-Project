// 5Fr8F8o2RsHZqsNr
// amaarahjanuary

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

const app = express();

app.use(express.json())
app.use(cors());

const postRouter = require('./routes/postRouter')
const userRouter = require('./routes/userRouter')
const commentRouter = require('./routes/commentRouter')

app.use('/posts', postRouter)
app.use('/users', userRouter)
// app.use('/comment', commentRouter)

app.listen(process.env.PORT||7200, () => console.log('Server Started'))