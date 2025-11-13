import ApiError from "../../../errors/ApiError";
import { hashPasswordHelpers } from "../../../helpers/hashPasswordHelpers";
import { IUser, IUserResponse } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from 'http-status'
import { ILoginPayload } from "./auth.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../../config";

export const registerService = async (payload: IUser): Promise<IUserResponse | null> => {
      const duplicateUser = await User.findOne({
            email: payload?.email
      });

      if (duplicateUser) {
            throw new ApiError(httpStatus.CONFLICT, 'Email already exist.');
      }

      const hashedPassword = await hashPasswordHelpers.hashPassword(payload?.password);

      const newUser = await User.create({ ...payload, password: hashedPassword });

      return newUser;
}

export const loginService = async (payload: ILoginPayload) => {
      const findUser = await User.findOne({
            email: payload?.email
      }).lean();

      if (!findUser) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Account not found.');
      }

      const { password, ...others } = findUser;
      const hashedPassword = password;

      const isPasswordMatched = await hashPasswordHelpers.isPasswordMatched(payload?.password, hashedPassword);

      if (!isPasswordMatched) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email or password does not match.');
      }

      const jwtPayload = {
            userId: findUser._id,
            email: findUser.email,
            firstName: findUser.firstName,
            lastName: findUser.lastName,
      };

      const token = jwtHelpers.createToken(
            jwtPayload,
            config.jwt.secret as Secret,
            config.jwt.expiresIn,
      );

      return {
            token: token,
            userInfo: others,
      };
}