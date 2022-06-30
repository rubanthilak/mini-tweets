import db from '$utils/database';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function put({ request, locals }) {
  const { id:user_id } = locals.user;
  const { tweet_id } = await request.json();

  const currentUser = await db.user.findUnique({
    where: {
      id: user_id
    },
    select: {
      likedTweets: {
        where: {
          id: tweet_id
        }
      },
    }
  });

  const isLikeByCurrentUser = currentUser?.likedTweets.length;
  let tweet;

  if(isLikeByCurrentUser){
    tweet = await db.tweet.update({
      where: {
        id: tweet_id
      },
      data: {
        likedBy: { disconnect: { id:user_id } }
      },
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
  }
  else{
    tweet = await db.tweet.update({
      where: {
        id: tweet_id
      },
      data: {
        likedBy: {connect: [{id: user_id}]}
      },
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
  }

  return {
    status: 200,
    body: {
      tweet
    }
  }
}