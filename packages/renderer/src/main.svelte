<script lang="ts">
	import { page, PAGE } from "$pages/page"
	import VeggieBurger from "$lib/veggie-burger.svelte"
	import Matrix from "$pages/matrix.svelte"
	import Home from "$pages/home.svelte"
</script>


<div class="head">
	<VeggieBurger />
</div>

<div class="main">
	{#if $page === PAGE.matrix}
		<Matrix />
	{:else if $page === PAGE.home}
		<Home />
	{/if}
</div>


<style></style>
