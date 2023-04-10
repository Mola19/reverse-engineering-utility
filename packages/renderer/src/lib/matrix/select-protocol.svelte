<script lang="ts">
	import { activeMatrixProtocolName, setMatrixProtocolDataList, matrixProtocolDataList } from "./matrix-protocol"
	import { STAGE, stage } from "./stage"
	import Cancel from "../cancel.svelte"
    import { openUserData } from "$use/app"

	async function selectMatrixProtocol ( matrixProtocolName: string ) {
		activeMatrixProtocolName.set(matrixProtocolName)
		stage.set(STAGE.initMatrix)
	}
</script>


{#each $matrixProtocolDataList as matrixProtocol}
	<button on:click={() => selectMatrixProtocol(matrixProtocol.name)} disabled={!matrixProtocol.detected}>{matrixProtocol.name}</button>
{/each}

<button on:click={setMatrixProtocolDataList}>Redetect</button>
<button on:click={() => openUserData("matrix-protocols")}>Open Matrix Protocol Folder</button>

<Cancel />
