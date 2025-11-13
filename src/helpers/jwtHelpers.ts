import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

const createToken = <T extends object>(
      payload: T,
      secret?: Secret,
      expiresIn: SignOptions['expiresIn'] = '1h'
): string => {
      const signingSecret: Secret = secret || process.env.JWT_SECRET!;

      const options: SignOptions = { expiresIn };

      return jwt.sign(payload, signingSecret, options);
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
      return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
      createToken,
      verifyToken,
};
