<script lang="ts">
	import Matrix from "$pages/matrix.svelte"
	import VeggieBurger from "$lib/veggie-burger.svelte"

	let current = "matrix"
</script>

<VeggieBurger bind:current />

{#if current === "matrix"}
	<Matrix />
{/if}


<style></style>
