import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
console.log('URI:', process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected ✅'))
.catch((err) => console.log('Failed ❌', err.message))
