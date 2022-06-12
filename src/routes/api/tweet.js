import db from '$utils/database';
import cookie from 'cookie-esm';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request }) {

  const tweets = await db.tweet.findMany({
    include: {
      likedBy: true
    }
  })

  return {
    status: 200,
    body: {
        message: 'Tweet posted successfully',
        tweets
    },
  };

}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, locals }) {
  const { id:userId } = locals.user;

  const { content } = await request.json()

  if(!content) {
    return {
      status: 402,
      body: {
        message: 'Cannot post empty tweets',
      },
    }
  }

  const tweet = await db.tweet.create({
    data : {
      content,
      author: { connect: { id: userId } },
    },
    include: {
      likedBy: true
    }
  })

  return {
    status: 201,
    body: {
        message: 'Tweet posted successfully',
        tweet
    },
  };
}