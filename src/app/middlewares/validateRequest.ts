import { NextFunction, Request, Response } from 'express';
import { ZodObject, ZodRawShape } from 'zod';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status'

const validateRequest =
      (schema: ZodObject<ZodRawShape>) =>
            async (req: Request, res: Response, next: NextFunction): Promise<void> => {
                  try {
                        const validatedData = schema.parse({
                              body: req.body,
                              query: req.query,
                              params: req.params,
                        });

                        const originalBodyKeys = Object.keys(req.body || {});
                        const validatedBodyKeys = Object.keys(validatedData.body || {});

                        const originalQueryKeys = Object.keys(req.query || {});
                        const validatedQueryKeys = Object.keys(validatedData.query || {});

                        let unExpectedBodyKeys: any = [];
                        let unExpectedQueryKeys: any = [];

                        originalBodyKeys.forEach((originalKey) => {
                              if (!validatedBodyKeys.includes(originalKey)) {
                                    unExpectedBodyKeys = [...unExpectedBodyKeys, originalKey];
                              }
                        });
                        if (unExpectedBodyKeys.length) {
                              throw new ApiError(
                                    httpStatus.BAD_REQUEST,
                                    `Unexpected body field(s) found: ${unExpectedBodyKeys.join(
                                          ", "
                                    )}. Please review your request and try again.`
                              );
                        }

                        originalQueryKeys.forEach((originalKey) => {
                              if (!validatedQueryKeys.includes(originalKey)) {
                                    unExpectedQueryKeys = [...unExpectedQueryKeys, originalKey];
                              }
                        });
                        if (unExpectedQueryKeys.length) {
                              throw new ApiError(
                                    httpStatus.BAD_REQUEST,
                                    `Unexpected query parameter(s) found: ${unExpectedQueryKeys.join(
                                          ", "
                                    )}. Please review your query and try again.`
                              );
                        }
                        // req.body = validatedData.body;
                        // req.query = validatedData.query as any;

                        // mutate existing objects instead of reassigning
                        Object.assign(req.body, validatedData.body);
                        Object.assign(req.query as any, validatedData.query);
                        Object.assign(req.params, validatedData.params);


                        return next();
                  } catch (error) {
                        next(error);
                  }
            };

export default validateRequest;
