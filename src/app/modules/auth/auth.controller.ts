import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { loginService, registerService } from "./auth.service";
import httpStatus from 'http-status';

export const registerController = catchAsync(async (req: Request, res: Response) => {
      const payload = req.body;

      const result = await registerService(payload);

      sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: 'Registration Successful',
            data: result,
      });
});

export const loginController = catchAsync(async (req: Request, res: Response) => {
      const payload = req.body;

      const result = await loginService(payload);

      sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Login Successful',
            data: result,
      });
});