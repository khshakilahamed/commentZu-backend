import z from "zod";
import { loginPayloadSchema } from "./auth.validation";
import { Types } from "mongoose";

export interface ILoginPayload extends z.infer<typeof loginPayloadSchema> { };

export interface IAuthUser {
      userId: Types.ObjectId;
      email: string;
      firstName: string;
      lastName: string;
}