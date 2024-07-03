const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const authRouter = require('./router/auth')
const cors = require('cors')
const userRouter = require('./router/userinfo')
const imageRouter = require('./router/Image')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors())
app.use(express.static('public'))






app.use('/auth', authRouter)
app.use("/user",userRouter)
app.use('/image', imageRouter)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Error: ', err)
}
)


// Connect to MongoDB


const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))