<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params, fetch, session, stuff }) {
    const response = await fetch('/api/tweet');
    const { tweets } = await response.json();

    return {
      status: response.status,
      props: {
        tweets
      }
    };
  }
</script>

<script>
  import { Button } from '$components/button';
  import { Card } from '$components/card';
  import { fly } from "svelte/transition";

  /** @type {Array<any>} */
  export let tweets;
  
  let content = '';

  /**
  * @type {{ content: any; likedBy: string | any[]; } | null}
  */
  let newTweet = null;

  async function triggerPost() {
    const response = await fetch('/api/tweet', {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: {
          'Content-Type': 'application/json'
      }
    });
    if(response.ok){
      const { tweet } = await response.json(); 
      content = '';
      newTweet = tweet;
    }
  }
</script>

<section class="home-section w-96 xl:w-1/3 mx-auto">
  <textarea class="input-field h-40 w-full resize-none" placeholder="What's on your mind ?" type="text" bind:value={content} />
  <Button size={'small'} on:click={triggerPost}>Tweet</Button>
  {#if newTweet}
    <div transition:fly={{y:-10,duration:500}}>
      <Card class="my-4 cursor-pointer">
        <p>{newTweet.content}</p>
        <div class="flex gap-2 mt-2">
          <p class="text-xs">{newTweet.likedBy.length}</p>
          <p class="text-xs cursor-pointer hover:text-accent">Like</p>
          <p class="text-xs cursor-pointer hover:text-accent">Reply</p>
        </div>
      </Card>
    </div>
  {/if}
  {#each tweets as tweet}
    <Card class="my-4 cursor-pointer">
      <p>{tweet.content}</p>
      <div class="flex gap-2 mt-2">
        <p class="text-xs">{tweet.likedBy.length}</p>
        <p class="text-xs cursor-pointer hover:text-accent">Like</p>
        <p class="text-xs cursor-pointer hover:text-accent">Reply</p>
      </div>
    </Card>
  {/each}
</section>
  
