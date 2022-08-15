<script lang="ts">
	import { fetchMatrixProtocolNames, fetchMatrixProtocolData, executeMatrixProtocolIteration } from "$use/matrix"

	let stage: number = 0

	let matrixProtocolNames: string[]
	let matrixProtocolData: MatrixProtocol
	let activeMatrixProtocol: string
	let matrix: (string | null)[]
	let matrixProtocolIteration: number
	let keydownListenerAbort: AbortController | undefined

	let resolveVirtualKeypress: ((val: string | null) => void) | null
	let resolvePhysicalKeypress: ((val: string) => void) | undefined

	async function getMatrixProtocolNames () {
		matrixProtocolNames = await fetchMatrixProtocolNames()
		stage = 1
	}

	async function askForUserApproval (matrixProtocolNameElement: EventTarget | null) {
		activeMatrixProtocol = (matrixProtocolNameElement as HTMLElement).innerHTML
		stage = 2
	}

	async function startMatrixGeneration () {
		matrixProtocolData = await fetchMatrixProtocolData(activeMatrixProtocol)
		matrixProtocolIteration = 0
		stage = 3

		matrix = Array(matrixProtocolIteration)

		keydownListenerAbort = new AbortController()

		document.body.addEventListener("keydown", (key) => {
			// ignore a keypress if the button is held
			if (key.repeat) return

			resolvePhysicalKeypress?.(`${key.key} (${key.code})`)
			resolvePhysicalKeypress = undefined
		}, { signal: keydownListenerAbort.signal})

		for (matrixProtocolIteration = 0; matrixProtocolIteration < matrixProtocolData.iterations; matrixProtocolIteration++) {
			executeMatrixProtocolIteration(activeMatrixProtocol, matrixProtocolIteration)
			matrix[matrixProtocolIteration] = await Promise.any([
				new Promise(( resolve ) => resolveVirtualKeypress = resolve) as Promise<string | null>,
				new Promise(( resolve ) => resolvePhysicalKeypress = resolve) as Promise<string>
			])
		}

		keydownListenerAbort.abort()

		stage = 4
	}

	function downloadJSON (filename: string, data: object) {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, "\t"))
		let downloadAnchorNode = document.createElement('a')
		downloadAnchorNode.setAttribute("href", dataStr)
		downloadAnchorNode.setAttribute("download", filename)
		downloadAnchorNode.click()
		downloadAnchorNode.remove()
	}
</script>

<!-- delete stage 0 -->
{#if stage === 0}
	<button on:click={() => getMatrixProtocolNames()}>Start</button>
{:else if stage === 1}
	{#each matrixProtocolNames as matrixProtocolName}
		<button on:click={(event) => askForUserApproval(event.target)}>{matrixProtocolName}</button>
	{/each}
{:else if stage === 2}
	<p>Do you want to start? You won't be able to use your keyboards special keys as long as you are focused on this window</p>
	<button on:click={() => startMatrixGeneration()}>Start</button>
{:else if stage === 3}
	<p>Your keys will now light up one after another, click the corresponding key on the screen or on your keyboard. When nothing lights up click the "Skip Key".</p>
	<p>The FN key can't be detected by the program because it doesn't get sent to the computer, so when it lights up, you have to click it on the screen.</p>
	<p>Progress: { (matrixProtocolIteration / (matrixProtocolData.iterations - 1)) * 100 }% ({ matrixProtocolIteration }/{ matrixProtocolData.iterations - 1 })</p>
	<button on:click={() => { resolveVirtualKeypress?.(null); resolveVirtualKeypress = null }}>Skip Key</button>
	<button on:click={() => { resolveVirtualKeypress?.("FN key"); resolveVirtualKeypress = null }}>FN</button>
	<button on:click={() => { resolveVirtualKeypress?.("Alt Gr (Right Alt)"); resolveVirtualKeypress = null }}>Alt Gr</button>
	<button on:click={() => { resolveVirtualKeypress?.("Caps lock"); resolveVirtualKeypress = null }}>Caps lock</button>
	<button on:click={() => { resolveVirtualKeypress?.("Print"); resolveVirtualKeypress = null }}>Print</button>
{:else if stage === 4}
	<p>The matrix generation is now done, click on the download button to download the data</p>
	<button on:click={() => downloadJSON(`${activeMatrixProtocol}-matrix.json`, { ...matrix })}>download</button>
{/if}


<style></style>
