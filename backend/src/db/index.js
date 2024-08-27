import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("MongoDB Connected !! Host: ", connectionInstance.connection.host)
    } catch (error) {
        console.log("Failed To Connect MongoDB: ", error)
    }
}

export default connectDB