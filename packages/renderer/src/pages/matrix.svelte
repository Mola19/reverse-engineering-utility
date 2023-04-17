<script lang="ts">
	import { stage, STAGE } from "$lib/matrix/stage"
	import { setMatrixProtocolDataList } from "$lib/matrix/matrix-protocol"

	import SelectProtocol from "$lib/matrix/select-protocol.svelte"
	import StartMatrix from "$lib/matrix/start-matrix.svelte"
	import Matrix from "$lib/matrix/matrix.svelte"
	import Download from "$lib/matrix/download.svelte"

	import LongTitle from "$lib/selector/long-title.svelte"
</script>


{#if $stage === STAGE.init}
	<LongTitle --tmp-font-size="1.5em" title="Start matrix generation">
		<button on:click={setMatrixProtocolDataList}>Start</button>
	</LongTitle>
{:else if $stage === STAGE.selectProtocol}
	<SelectProtocol />
{:else if $stage === STAGE.initMatrix}
	<StartMatrix />
{:else if $stage === STAGE.matrix}
	<Matrix />
{:else if $stage === STAGE.download}
	<Download />
{/if}
