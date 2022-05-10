import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { config } from './config.js';
import userRoutes from './routes/user.js';
import tweetRoutes from './routes/tweet.js';
import { errHandler, notFound } from './middlewares/error.js';

const app = express();

const corsOptions = { origin: '*', optionsSuccessStatus: 200 };

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(helmet());

app.get('/', (req, res) => {
  res.send(`I'm learning typescript now.. :)`);
});

app.use('/users', userRoutes);
app.use('/tweets', tweetRoutes);

app.use(notFound);
app.use(errHandler);

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});
