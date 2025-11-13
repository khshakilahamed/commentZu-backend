import express from 'express'
import { addCommentController, getCommentController } from './comment.controller';
import auth from '../../middlewares/auth';
import { addCommentSchema, getCommentSchema } from './comment.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router
      .post('/',
            auth,
            validateRequest(addCommentSchema),
            addCommentController
      )
      .get('/',
            auth,
            validateRequest(getCommentSchema),
            getCommentController
      )

export const commentRoutes = router;
