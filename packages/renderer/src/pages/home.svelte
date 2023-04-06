<script lang="ts">
	import Selector from "$lib/selector.svelte";
	import { current, MODE } from "./page"
</script>


<Selector title="select mode" >
	<div on:keydown={() => current.set(MODE.matrix)} on:click={() => current.set(MODE.matrix)} class="el">matrix</div>
</Selector>

<!-- <div class="main">
	<h2>select mode</h2>
	<div on:keydown={() => current.set(MODE.matrix)} on:click={() => current.set(MODE.matrix)} class="el">matrix</div>
</div> -->


<style>
	/* .main {
		margin: 15vh 20vw 20vh 20vw;
		display: grid;
		gap: 5px;
	}

	.el {
		border-radius: var(--border-radius);
		padding: 10px;
		background-color: var(--element-background-color);
		cursor: pointer;
	}

	.el:hover {
		background-color: var(--highlight-background-color);
	}

	h2 {
		text-align: center;
		padding-bottom: 10px;
	} */
</style>
