import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { addCommentService, deleteParentCommentService, dislikeCommentService, getCommentService, getRepliedCommentService, likeCommentService, replyCommentService } from "./comment.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from 'http-status'
import { IAuthUser } from "../auth/auth.interface";

export const addCommentController = catchAsync(async (req: Request, res: Response) => {
      const payload = req.body;
      const user = req.user as IAuthUser;

      const result = await addCommentService(user, payload);

      sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: 'comment added',
            data: result,
      });
});

export const getCommentController = catchAsync(async (req: Request, res: Response) => {
      const query = req.query;

      const result = await getCommentService(query);

      sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Comment(s) retrieved successfully',
            data: result,
      });
});

export const likeCommentController = catchAsync(async (req: Request, res: Response) => {
      const user = req.user as IAuthUser;
      const commentId = req.params?.commentId;

      const result = await likeCommentService(user, commentId);

      sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Success',
            data: result,
      });
});

export const dislikeCommentController = catchAsync(async (req: Request, res: Response) => {
      const user = req.user as IAuthUser;
      const commentId = req.params?.commentId;

      const result = await dislikeCommentService(user, commentId);

      sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Success',
            data: result,
      });
});

export const replyCommentController = catchAsync(async (req: Request, res: Response) => {
      const user = req.user as IAuthUser;
      const commentId = req.params?.commentId;
      const payload = req.body;

      const result = await replyCommentService(user, commentId, payload);

      sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: 'Successfully replied.',
            data: result,
      });
});

export const getRepliedCommentController = catchAsync(async (req: Request, res: Response) => {
      const commentId = req.params?.commentId;

      const result = await getRepliedCommentService(commentId);

      sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Successfully replied.',
            data: result,
      });
});

export const deleteParentCommentController = catchAsync(async (req: Request, res: Response) => {
      const commentId = req.params?.commentId;
      const user = req.user as IAuthUser;

      const result = await deleteParentCommentService(user, commentId);

      sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Comment deleted',
            data: result,
      });
});