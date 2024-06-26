import { configDotenv } from 'dotenv'
import express from 'express'
import authRoute from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoute.js'
import logger from 'morgan'
import cors from 'cors'
import connectToMongoDB from './db/connectToMongoDB.js'
import { app, server } from "./socket/socket.js";
import cookieParser from 'cookie-parser'
configDotenv()

const allowedOrigins = ['https://chat-d3hgd16kr-vyshnav-kvs-projects.vercel.app','http://localhost:5173','https://chat-backend-2aqv.onrender.com','https://chat-steel-zeta.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // This allows cookies to be sent across origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
}));
app.use(express.json())
app.use(cookieParser())
app.use(logger('dev'))

app.use("/api/messages", messageRoutes);
app.use('/api/auth', authRoute)
app.use("/api/users", userRoutes);


const port = process.env.PORT || 5000
server.listen(port, () => {
    connectToMongoDB();
    console.log('server started at port 5000');
})