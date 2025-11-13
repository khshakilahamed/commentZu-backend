import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { addCommentService, getCommentService } from "./comment.service";
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