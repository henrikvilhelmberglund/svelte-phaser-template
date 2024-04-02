<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	type ButtonProps = {
		onclick: MouseEventHandler<HTMLButtonElement>;
		disabled?: boolean;
    children: Snippet;
	};
	let { onclick, children, disabled }: ButtonProps = $props();
</script>

<button
	{onclick}
	{disabled}
	class="m-1 rounded-lg border border-white p-2 text-white hover:border-blue-200 active:bg-blue-900 disabled:cursor-not-allowed">
	{#if children}
		{@render children()}
	{:else}
		Missing button text
	{/if}
</button>
