import db from '$utils/database';
import cookie from 'cookie-esm';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params, request }) {

  const id = parseInt(params.id);

  let user = await db.user.findUnique({
    where: {
      id
    },
    include: {
      tweets: true,
      followers: true,
      following: true
    },
  })

  if(!user) return { status: 404, body: { message: 'User not found' }}
  
  if(user.password) delete user.password;

  return {
    status: 200,
    body: {
        user
    },
  };

}