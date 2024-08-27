import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config()
const port = process.env.PORT || 8000
connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.log("Middleware Error:", err)
        })
        app.get('/api/user', (req, res) => {
            res.send("Inside The User")
        })
        app.listen(port, () => {
            console.log("App Is Runing On Port Number:", port)
        })
    })
    .catch((error) => {
        console.log("Error: ", error)
    })