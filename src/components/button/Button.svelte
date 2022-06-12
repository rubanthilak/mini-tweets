<script lang="ts">
	let className:string = '';
  export { className as class };
	export let color: 'default' | 'accent' | 'error' | 'warning' | 'success' | 'disabled' | 'secondary' = 'accent';
	export let outline: boolean = false;
	export let size: 'large' | 'normal' | 'small' | 'mini' | 'icon'  = 'normal';
	export let type : 'submit' | 'button' = 'submit';
	export let isSpan: boolean = false;
</script>

<button 
	class={`btn ${color} ${size} ${isSpan && 'w-full'} ${outline && 'btn-outline'} ${className}`}
	{...$$restProps}
	on:click
	{type}
>
	<slot />
</button>

<style lang="scss">
	.btn {
		@apply flex justify-center cursor-pointer items-center rounded shadow font-bold border text-sm;

		&.btn-outline{
			@apply bg-transparent border shadow-none;
		}
	}
	/*colors */
	.default {
		@apply bg-primary-900 text-white border-primary-900;

		&.btn-outline{
			@apply text-primary-900;
		}
	}
	.accent {
		@apply bg-accent text-white border-accent;
		&.btn-outline{
			@apply text-accent;
		}
	}
	.secondary {
		@apply bg-secondary text-white border-secondary;
		&.btn-outline{
			@apply text-secondary ;
		}
	}
	.error {
		@apply bg-error text-white border-error;
		&.btn-outline{
			@apply text-error ;
		}
	}
	.warning {
		@apply bg-warning text-white border-warning;
		&.btn-outline{
			@apply text-warning ;
		}
	}
	.success {
		@apply bg-success text-white border-success;
		&.btn-outline{
			@apply text-success ;
		}
	}
	/*size */
	.large {
		@apply px-4 py-3;
	}
	.normal {
		@apply px-4 py-2;
	}
	.small {
		@apply text-sm px-3 py-1;
	}
	.mini {
		@apply text-xs px-2 py-1;
	}
	.icon {
		@apply p-1;
	}
</style>