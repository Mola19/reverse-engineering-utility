<script lang="ts">
	import Wrap from "$lib/selector/wrap.svelte"
	import { page, PAGE } from "./page"
</script>


<Wrap>
	<h2>Select Mode</h2>

	<div class="main">
		<div class="btn" on:keydown={() => page.set(PAGE.matrix)} on:click={() => page.set(PAGE.matrix)}>Matrix</div>
	</div>
</Wrap>


<style>
	.main {
		position: absolute;
		top: calc(32px + var(--margin-gap));
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: auto;
		overflow-x: hidden;

		display: flexbox;
		gap: 5px;
	}

	.main > :global(div.btn), .main > :global(button) {
		margin-bottom: var(--select-gap);
	}

	.main > :global(div.btn):last-child, .main > :global(button):last-child {
		margin-bottom: 0;
	}

	h2 {
		text-align: center;
		padding-bottom: var(--margin-gap);
	}
</style>
