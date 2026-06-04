import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import dns from 'node:dns';
import path from 'path';
import authRouter from './routes/auth.route.js';
import notesRouter from './routes/generate.route.js';
import pdfRouter from './routes/pdf.route.js';
import userRouter from './routes/user.route.js';
import connectDB from './utils/connectdb.js';
import creditRouter from './routes/credits.route.js';
import { stripeWebhook } from './controllers/credits.controller.js';

dns.setServers(['1.1.1.1', '8.8.8.8']);

dotenv.config({ path: path.resolve('.env') });

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

app.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/notes', notesRouter);
app.use('/api/pdf', pdfRouter);
app.use('/api/credit', creditRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});
