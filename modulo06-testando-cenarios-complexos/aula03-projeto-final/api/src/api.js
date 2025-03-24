import express from 'express';
import cors from 'cors';
import userRouter from './routes/UserRouter.js'
import analyticsRouter from './routes/AnalyticsRouter.js'

const app = express();

app.use(cors());
app.use('/users/', userRouter);
app.use('/analytics/', analyticsRouter);

export { app };