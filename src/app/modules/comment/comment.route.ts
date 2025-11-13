import express from 'express'
import { addCommentController, dislikeCommentController, getCommentController, getRepliedCommentController, likeCommentController, replyCommentController } from './comment.controller';
import auth from '../../middlewares/auth';
import { addCommentSchema, getCommentSchema, likeCommentSchema } from './comment.validation';
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

router
      .get('/:commentId/like',
            auth,
            validateRequest(likeCommentSchema),
            likeCommentController
      )
      .get('/:commentId/dislike',
            auth,
            validateRequest(likeCommentSchema),
            dislikeCommentController
      )
      .post('/:commentId/reply',
            auth,
            validateRequest(addCommentSchema),
            replyCommentController
      )
      .get('/:commentId/reply',
            auth,
            validateRequest(likeCommentSchema),
            getRepliedCommentController
      )

export const commentRoutes = router;
