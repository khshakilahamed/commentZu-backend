import { Types } from "mongoose";

export type IUser = {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
};

export type IUserResponse = {
      _id: Types.ObjectId;
      firstName: string;
      lastName: string;
      email: string;
      createdAt?: string;
      updatedAt?: string;
};
