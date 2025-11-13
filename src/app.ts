import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

import cookieParser from 'cookie-parser'
import { authRoutes } from './app/modules/auth/auth.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { commentRoutes } from './app/modules/comment/comment.route'

const app: Application = express()

const corsOptions = {
  origin: true,
  credentials: true,
}
app.use(cors(corsOptions))
app.use(cookieParser())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/comment', commentRoutes);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Welcome HTTP SERVER',
  })
});

// Global error handler
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Resource not found',
      },
    ],
  });
  next();
});

export default app
