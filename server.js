
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
const contactRouter = require('./routes/contactRoute')

app.get('/', (req, res) => {
    res.send( "Welcome to Amaarah's Blog Backend. Use /users to view all users. Use /users/:id to view a single user. Use /posts to view all posts. Use /posts/:id to view a single post."
    );

});


app.use('/posts', postRouter)
app.use('/users', userRouter)
// app.use('/comment', commentRouter)
app.use('/contact', contactRouter)

app.listen(process.env.PORT||7200, () => console.log('Server Started'))