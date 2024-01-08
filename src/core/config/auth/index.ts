import 'dotenv-flow/config';

export const auth = {
  secret: process.env.JWT_SECRET,
  expiresIn: '1d',
}