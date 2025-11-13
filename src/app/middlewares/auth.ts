import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import { User } from '../modules/user/user.model';

const auth =
      async (req: Request, res: Response, next: NextFunction) => {
            try {
                  //get authorization token
                  const token = req.headers.authorization;
                  if (!token) {
                        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
                  }
                  // verify token
                  let verifiedUser = null;

                  verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

                  if (!verifiedUser?.email || !verifiedUser?.userId) {
                        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
                  }

                  const findUser = await User.find({
                        _id: verifiedUser?.userId,
                        email: verifiedUser?.email,
                  }).lean();

                  if (!findUser) {
                        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
                  }

                  req.user = verifiedUser; // firstName, lastName, email, userId

                  next();
            } catch (error) {
                  next(error);
            }
      };

export default auth;
