import db from '$utils/database';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request }) {

  const tweets = await db.tweet.findMany({
    include: {
      _count:{
        select: { likedBy: true },
      },
      author: {
        select: {
          name: true,
          id: true
        }
      }
    }
  })

  return {
    status: 200,
    body: {
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
      likedBy: true,
      author: {
        select: {
          name: true,
          id: true
        }
      }
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