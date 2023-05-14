<script lang="ts">
	import { stage, STAGE } from "$lib/matrix/stage"

	import Init from "$lib/matrix/init.svelte"
	import SelectProtocol from "$lib/matrix/select-protocol.svelte"
	import StartMatrix from "$lib/matrix/start-matrix.svelte"
	import Matrix from "$lib/matrix/matrix.svelte"
	import Download from "$lib/matrix/download.svelte"
</script>


{#if $stage === STAGE.init}
	<Init />
{:else if $stage === STAGE.selectProtocol}
	<SelectProtocol />
{:else if $stage === STAGE.initMatrix}
	<StartMatrix />
{:else if $stage === STAGE.matrix}
	<Matrix />
{:else if $stage === STAGE.download}
	<Download />
{/if}
