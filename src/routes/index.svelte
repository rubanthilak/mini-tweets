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
  import { Button, Card, Tweet as TweetCard } from '$components';
  import { fly } from "svelte/transition";

  /** @type { Array<Tweet> } */
  export let tweets;
  /** @type { Tweet | null} */
  let justTweeted = null;
  /** @type { string | null }*/
  let content = '';

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
      justTweeted = tweet;
    }
  }

</script>

<section class="home-section w-96 xl:w-1/3 mx-auto">
  <textarea class="input-field h-40 w-full resize-none" placeholder="What's on your mind ?" type="text" bind:value={content} />
  <Button size={'small'} on:click={triggerPost}>Tweet</Button>
  {#if justTweeted}
    <div transition:fly={{y:-10,duration:500}}>
      <Card class="my-4 cursor-pointer">
        <p class="text-sm font-bold mb-4 underline">{justTweeted.author.name}</p>
        <p>{justTweeted.content}</p>
        <div class="flex gap-2 mt-2">
          <p class="text-xs">{justTweeted._count.likedBy}</p>
          <p class="text-xs cursor-pointer hover:text-accent">Like</p>
          <p class="text-xs cursor-pointer hover:text-accent">Reply</p>
        </div>
      </Card>
    </div>
  {/if}
  {#each tweets as tweet}
    <TweetCard tweet={tweet} />
  {/each}
</section>
  
