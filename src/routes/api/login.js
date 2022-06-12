import db from '$utils/database';
import cookie from 'cookie-esm';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
  const { email, password } = await request.json()

  if(!email || !password) {
    return {
      status: 402,
      body: {
        message: 'Email & Password is required',
      },
    }
  }

  const user = await db.user.findUnique({
    where: {
      email
    }
  })

  if(!user) {
    return {
      status: 402,
      body: {
        message: 'User does not exist',
      },
    }
  }

  const isValidPassword = await bcrypt.compare(
    password,
    user.password
  );

  if(!isValidPassword) {
    return {
      status: 402,
      body: {
        message: 'User or Password is invalid',
      },
    }
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME
    }
  );

  return {
    status: 200,
    headers: {
        'set-cookie': cookie.serialize('jwt_token', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7
        }),
    },
    body: {
        message: 'Signed in successfully',
    },
  };

}