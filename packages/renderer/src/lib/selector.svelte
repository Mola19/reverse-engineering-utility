<script lang="ts">
	export let title: string;
</script>


<div class="main">
	<h2>{title}</h2>
	<slot />
</div>


<style>
	.main {
		margin: 15vh 20vw 20vh 20vw;
		display: grid;
		gap: 5px;
	}

	.main > :global(div) {
		border-radius: var(--border-radius);
		padding: 10px;
		background-color: var(--element-background-color);
		cursor: pointer;
	}

	.main > :global(div):hover {
		background-color: var(--highlight-background-color);
	}

	h2 {
		text-align: center;
		padding-bottom: 10px;
	}
</style>
