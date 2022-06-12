<script>
  import { Button } from '$components/button';
  import { goto } from '$app/navigation';

  let email = 'ruban@abc.com';
  let password = 'test1234';
  let error = '';

  async function triggerLogin() {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
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
  <form on:submit|preventDefault={triggerLogin} class="wrapper flex flex-col gap-y-4 justify-end sm:justify-center">
    <h1 class="text-xl">Welcome back !</h1>
    {#if error}
      <p class="text-error text-xs">{error}</p>
    {/if}
    <input class="input-field" type="text" placeholder="Email" bind:value={email}>
    <input class="input-field" type="password" placeholder="Password" bind:value={password}>
    <a class="text-xs link" href="/">Forgot Password ?</a>
    <Button type="submit" isSpan>Login</Button>
    <p class="text-xs">New user ? <span><a class="text-xs link" href="/signup">Click here</a></span> to signup.</p>
  </form>
</section>