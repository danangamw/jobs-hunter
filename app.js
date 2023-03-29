require('dotenv').config();
require('express-async-errors');

const path = require('path');
// extra security packages
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.set('trust proxy', 1);
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

const connectDB = require('./db/connect');
const authenticatedUser = require('./middleware/authentication');

// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticatedUser, jobsRouter);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
