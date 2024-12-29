import express from 'express';
import userRouter from './routes/UserRouter.js'

const app = express();

app.use('/users/', userRouter);

export { app };