<script>
  import { Card } from '$components';
  /**
  * @type {Tweet}
  */
  let tweetData;
  export {tweetData as tweet};

  /**
  * @param {number} tweetId
  */
  async function likePost(tweetId) {
    const response = await fetch(`/api/tweet/like`, {
      method: 'PUT',
      body: JSON.stringify({
        'tweet_id': tweetId
      }),
      headers: {
          'Content-Type': 'application/json'
      }
    });
    if(response.ok){
      const { tweet } = await response.json(); 
      tweetData = { ...tweet };
    }
  }
</script>


<Card class="my-4 cursor-pointer">
  <a href={`/user/${tweetData.author.id}`} class="text-sm font-bold mb-4 underline hover:text-accent">{tweetData.author.name}</a>
  <p>{tweetData.content}</p>
  <div class="flex gap-2 mt-2">
    <p class="text-xs">{tweetData._count.likedBy}</p>
    <p class="text-xs cursor-pointer hover:text-accent" on:click={() => likePost(tweetData.id)}>Like</p>
    <p class="text-xs cursor-pointer hover:text-accent">Reply</p>
  </div>
</Card>