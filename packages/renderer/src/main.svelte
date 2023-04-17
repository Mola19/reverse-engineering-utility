<script lang="ts">
	import { page, PAGE } from "$pages/page"
	import Head from "$lib/head.svelte"

	import Matrix from "$pages/matrix.svelte"
	import Home from "$pages/home.svelte"
</script>


<Head />

<div class="main">
	{#if $page === PAGE.matrix}
		<Matrix />
	{:else if $page === PAGE.home}
		<Home />
	{/if}
</div>
