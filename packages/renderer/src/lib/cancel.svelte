<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { STAGE, stage } from "./matrix/stage"

	export let tabindex = 0

	const dispatch = createEventDispatcher()
	function cancel () {
		stage.set(STAGE.init)
		dispatch("cancel")
	}
</script>


<button {tabindex} on:keydown={cancel} on:click={cancel}>Cancel</button>

<style>
	button:hover {
		background-color: var(--cancel-background-color) !important;
	}
</style>
