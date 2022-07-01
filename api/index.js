import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import courseRoute from './routes/courses.js'
import quizRoute from './routes/skillQuizes.js'
import helmet from 'helmet'
dotenv.config()



const app=express()
const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb");
    } catch (error) {
        throw error
    }
}
mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected");
})

//middlewwres
app.use(cookieParser())
app.use(express.json())
app.use(morgan())
app.use(helmet())
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))




app.use('/api/skillquizes',quizRoute)
app.use('/api/posts',postRoute)
app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/courses',courseRoute)
app.use((err,req,res,next)=>{
    const errorStatus=err.status||500
    const errorMessage=err.message||"Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})
app.listen(5001,()=>{
    connect()
    console.log("backend server is running");
})