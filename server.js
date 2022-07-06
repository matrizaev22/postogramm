import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import verificationroutes from './/routes/verification.routes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(authRoutes)
app.use(verificationroutes)



app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running on http://localhost:8080');
})
