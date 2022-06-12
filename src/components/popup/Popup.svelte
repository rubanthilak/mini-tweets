<script lang="ts">
  import "./style.scss";
  import { portal } from "$components/portal";
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";

  export let isOpen = false;

  let dispatch = createEventDispatcher();
  
</script>

{#if isOpen}
  <div use:portal={"body"} class="h-screen w-screen fixed top-0 left-0 z-30">
    <div transition:fade={{duration:200}} class="overlay" on:click={()=>dispatch('close')}></div>
    <dialog transition:fly={{y:-10,duration:200}} class="modal">
      <header>
        <slot name="header"></slot>
      </header>
      <section>
        <slot name="content"></slot>
      </section>
      <section class="mt-4">
        <slot name="actions"></slot>
      </section>
    </dialog>
  </div>
{/if}