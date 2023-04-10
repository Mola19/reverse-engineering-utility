<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { STAGE, stage } from "./matrix/stage"

	const dispatch = createEventDispatcher()
	function cancel () {
		stage.set(STAGE.init)
		dispatch("cancel")
	}
</script>


<div class="footer">
	<button on:keydown={cancel} on:click={cancel}>cancel</button>
</div>


<style>
	.footer {
		position: fixed;
		bottom: 0;

		width: 100%;
		height: 10%;

		/* align */
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
