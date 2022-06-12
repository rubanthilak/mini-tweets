import db from '$utils/database';
import cookie from 'cookie-esm';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
  const { name, email, password } = await request.json()

  if(!name || !email || !password) {
    return {
      status: 402,
      body: {
        message: 'Name, Email & Password is required',
      },
    }
  }

  let user = await db.user.findUnique({
    where: {
      email
    }
  })

  if(user) {
    return {
      status: 401,
      body: {
        message: 'Email Id already exist',
      },
    }
  }

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  user = await db.user.create({
    data : {
      name,
      email,
      password : encryptedPassword
    }
  })

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