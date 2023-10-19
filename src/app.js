
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import { validateSchema } from './schemas/ip.schema.js'

dotenv.config()
const app = express()


//disable x-powered-by: express
app.disable('x-powered-by')

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Routes

app.get('/:ip', async (req, res) => {
    const { ip } = req.params
    const result = validateSchema(ip)
    const TOKEN = process.env.TOKEN
    
    const url = `https://ipinfo.io/${result}?token=${TOKEN}`
    const response = await fetch(url)
        .then(res => res.json())
        .catch(err => console.log(err))
    return res.json(response)
})

export default app