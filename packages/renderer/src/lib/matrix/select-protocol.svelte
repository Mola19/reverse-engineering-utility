<script lang="ts">
	import { activeMatrixProtocolName, setMatrixProtocolDataList, matrixProtocolDataList } from "./matrix-protocol"
	import { STAGE, stage } from "./stage"
	import Cancel from "../cancel.svelte"
	import { openUserData } from "$use/app"
	import Wrap from "$lib/selector/wrap.svelte"
	import Loading from "./lib/loading.svelte"

	async function selectMatrixProtocol ( matrixProtocolName: string ) {
		activeMatrixProtocolName.set(matrixProtocolName)
		stage.set(STAGE.initMatrix)
	}
</script>

<Wrap>
	<h2>Select Protocol</h2>

	<div class="top">
		<div class="list">
			{#each $matrixProtocolDataList as matrixProtocol}
				<button on:click={() => selectMatrixProtocol(matrixProtocol.name)} disabled={!matrixProtocol.detected}>{matrixProtocol.name}</button>
			{/each}
		</div>
	</div>

	<div class="bottom">
		<button on:click={() => setMatrixProtocolDataList(true)}>Redetect</button>
		<button on:click={() => openUserData("matrix-protocols")}>Open Folder</button>
		<Cancel />
	</div>
</Wrap>

<Loading />


<style>
	h2 {
		text-align: center;
		margin-bottom: var(--margin-gap);
	}

	.top {
		position: absolute;
		top: calc(32px + var(--margin-gap));
		left: 0;
		right: 0;
		bottom: calc(88px + var(--margin-gap));

		overflow: auto;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--select-gap);
	}

	.top button {
		font-weight: 700;
	}

	.bottom {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		flex-wrap: wrap;
		gap: var(--select-gap);
	}

	.bottom > button:nth-of-type(1), .bottom button:nth-of-type(2) {
		flex-basis: calc(50% - var(--select-gap) / 2);
	}
</style>
