<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session }) {
		const response = await fetch(`/api/user/${params.id}`);
		const { user } = await response.json();

		return {
			status: response.status,
			props: {
				user,
        currentUserId : session.user.id
			}
		};
	}
</script>

<script>
	import { Button } from '$components/button';

	/** @type {any} */
	export let user;

	/** @type {number}*/
	export let currentUserId;

	$: didFollow = user.followers.some(
		(/** @type {{ followingId: any; }} */ follower) => follower.followingId == currentUserId
	);

	async function triggerFollow() {
		const response = await fetch(`/api/user/${user.id}/follow`, {
			method: 'POST'
		});
		if (response.ok) {
			const data = await response.json();
			user = { ...data.user };
		}
	}

	async function triggerUnfollow() {
		const response = await fetch(`/api/user/${user.id}/follow`, {
			method: 'DELETE'
		});
		if (response.ok) {
			const data = await response.json();
			user = { ...data.user };
		}
	}
</script>

<head>
	<title>{user ? user.name : 'Loading..'}</title>
</head>

{#if user}
	<h1>{user.name}</h1>
	<p>{user.email}</p>
	<p>Followers {user.followers.length}</p>
	<p>Following {user.following.length}</p>
	<p>Tweets {user.tweets.length}</p>
	{#if didFollow}
		<Button type="button" size="small" on:click={triggerUnfollow}>Unfollow</Button>
	{:else}
		<Button type="button" size="small" on:click={triggerFollow}>Follow</Button>
	{/if}
{/if}
