import { configDotenv } from 'dotenv'
import express from 'express'
import authRoute from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoute.js'
import logger from 'morgan'
import cors from 'cors'
import connectToMongoDB from './db/connectToMongoDB.js'
import { app, server } from "./socket/socket.js";
configDotenv()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.use("/api/messages", messageRoutes);
app.use('/api/auth',authRoute)
app.use("/api/users", userRoutes);


const port = process.env.PORT || 5000
server.listen(port,()=>{
    connectToMongoDB();
    console.log('server started at port 5000');
})