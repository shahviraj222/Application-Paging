import cors from 'cors'
import express from 'express'

const app = express()
app.use(express.static('dist'))

app.use(cors());
app.use(express.json());

export { app }
