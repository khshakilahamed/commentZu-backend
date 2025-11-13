import express from 'express';
import { loginController, registerController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { loginSchema, registerSchema } from './auth.validation';

const router = express.Router();

router.post('/register',
      validateRequest(registerSchema),
      registerController
);

router.post('/login',
      validateRequest(loginSchema),
      loginController
);

export const authRoutes = router;