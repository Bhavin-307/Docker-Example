import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import AuthRoutes from '#routes/auth.routes.js';
import securityMiddleware from '#middlewares/security.middleware.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(
  morgan('combined', {
    stream: {write: message => logger.info(message.trim())},
  })
);

app.use(securityMiddleware);

app.get('/', (req, res) => {
  logger.info('Hello From Bhavin!');

  res.status(200).send('Hello From Bhavin');
});

app.use('/api/auth', AuthRoutes);

export default app;
