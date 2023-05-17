<script lang="ts">
	import Wrap from "./wrap.svelte"
	export let title: string | string[]
</script>


<Wrap>
	{#if Array.isArray(title)}
		{#each title as t}
			<h3>{t}</h3>
		{/each}
	{:else}
		<h3>{title}</h3>
	{/if}

	<div class="main">
		<slot />
	</div>
</Wrap>


<style>
	.main {
		display: flexbox;
		gap: 5px;

		overflow-y: auto;
		overflow-x: hidden;
	}

	.main > :global(div.btn), .main > :global(button) {
		margin-bottom: var(--select-gap);
	}

	.main > :global(div.btn):last-child, .main > :global(button):last-child {
		margin-bottom: 0;
	}

	h3 {
		font-size: var(--tmp-font-size, 1.17em);
		text-align: center;
	}

	h3:last-of-type {
		padding-bottom: var(--margin-gap);
	}
</style>
