import db from '$utils/database';
import cookie from 'cookie-esm';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ params, request, locals }) {

  const { id: followingId } = locals.user;
  const followerId = parseInt(params.id);

  const follow = await db.follows.create({
    data : {
      follower : { connect: { id: followerId } },
      following : { connect: { id: followingId } },
    }
  })

  const user = await db.user.findUnique({
    where : {
      id: followerId
    },
    include: {
      tweets: true,
      followers: true,
      following: true
    },
  })

  return {
    status: 200,
    body: {
      user
    },
  };
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function del({ params, request, locals }) {

  const { id: followingId } = locals.user;
  const followerId = parseInt(params.id);

  const follow = await db.follows.delete({
    where : {
      followerId_followingId : {
        followerId  : followerId,
        followingId : followingId
      }
    }
  })

  const user = await db.user.findUnique({
    where : {
      id: followerId
    },
    include: {
      tweets: true,
      followers: true,
      following: true
    },
  })

  return {
    status: 200,
    body: {
      user
    },
  };
}