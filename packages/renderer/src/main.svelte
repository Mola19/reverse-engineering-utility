<script lang="ts">
	import { current, MODE } from "$pages/page"
	import VeggieBurger from "$lib/veggie-burger.svelte"
	import Matrix from "$pages/matrix.svelte"
    import Home from "$pages/home.svelte"
</script>


<div class="head">
	<VeggieBurger />
</div>

<div class="main">
	{#if $current === MODE.matrix}
		<Matrix />
	{:else if $current === MODE.home}
		<Home />
	{/if}
</div>


<style></style>
