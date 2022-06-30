<script>
  import { Button } from '$components/button';
  import { goto } from '$app/navigation';

  let name = 'ruban';
  let email = 'ruban@abc.com';
  let password = 'test1234';
  let repeatPassword = 'test1234';
  let error = '';

  async function triggerSignup() {

    if (password !== repeatPassword) {
      error = 'Password do not match';
      return;
    }

    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
          'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      error = (await response.json()).message;
      return;
    }

    await goto('/', { replaceState:true })
  }
</script>

<section class="login_section mx-auto w-80 sm:w-96">
  <form on:submit|preventDefault={triggerSignup} class="wrapper flex flex-col gap-y-4 justify-end sm:justify-center">
    <h1 class="text-2xl">Hey there !</h1>
    {#if error}
      <p class="text-error text-xs">{error}</p>
    {/if}
    <input class="input-field" type="text" placeholder="Name" bind:value={name}>
    <input class="input-field" type="text" placeholder="Email" bind:value={email}>
    <input class="input-field" type="password" placeholder="Password" bind:value={password}>
    <input class="input-field" type="password" placeholder="Confirm Password" bind:value={repeatPassword}>
    <Button type="submit" isSpan>Signup</Button>
    <p class="text-xs">Existing user ? <span><a class="text-xs link" href="/login">Click here</a></span> to login.</p>
  </form>
</section>