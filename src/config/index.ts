import dotenv from 'dotenv'
import { SignOptions } from 'jsonwebtoken'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.SALT_ROUNDS,
  jwt: {
    secret: process.env.TOKEN_SECRET as string,
    expiresIn: process.env.TOKEN_EXPIRE as SignOptions['expiresIn'],
  }
}
