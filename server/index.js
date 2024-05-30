import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import postRouter from './routes/post.js'
import email from './routes/resend.js'

dotenv.config()

const app = express()

app.use(express.json({limit: "5mb"}))
app.use(express.urlencoded({extended: true}))
app.use(cors())

mongoose.connect(process.env.DATABASE)
.then(() => console.log("Database connected."))
.catch(err => console.log("MongoDB error."))


// dynamically assign routes
app.use('/', authRouter)
app.use('/', postRouter)
app.use('/', email)




const port = process.env.PORT || 8000
app.listen(port, console.log(`Server is running at port ${port}.`))















