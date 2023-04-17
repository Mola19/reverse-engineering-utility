<script lang="ts">
	import { initMatrixProtocol } from "$use/matrix"
	import { STAGE, stage } from "./stage"
	import { activeMatrixProtocolName, matrixProtocolDataList, matrix, activeMatrixProtocol } from "./matrix-protocol"
	import Cancel from "../cancel.svelte"
	import LongTitle from "$lib/selector/long-title.svelte"

	async function startMatrixGeneration () {
		initMatrixProtocol($activeMatrixProtocolName)

		matrix.set([])
		activeMatrixProtocol.set($matrixProtocolDataList.find(( el ) => el.name == $activeMatrixProtocolName)!)
		stage.set(STAGE.matrix)
	}
</script>


<LongTitle title="Do you want to start the matrix generation?">
	<button on:click={() => startMatrixGeneration()}>Start</button>
	<Cancel />
</LongTitle>
