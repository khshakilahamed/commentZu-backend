import z from "zod";
import { loginPayloadSchema } from "./auth.validation";

export interface ILoginPayload extends z.infer<typeof loginPayloadSchema> { };