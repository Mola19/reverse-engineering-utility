<script lang="ts">
	import { fetchMatrixProtocolData, executeMatrixProtocolIteration } from "$use/matrix"

	let stage: number = 0

	let matrixProtocolDataList: MatrixProtocol[]
	let matrixProtocolData: MatrixProtocol
	let activeMatrixProtocol: string
	let matrix: (string | null)[]
	let matrixProtocolIteration: number
	let keydownListenerAbort: AbortController | undefined

	let capsLockActive: boolean = false
	let altGrCheck: boolean = false

	let resolveVirtualKeypress: ((val: string | null) => void) | null
	let resolvePhysicalKeypress: ((val: string) => void) | undefined

	let customKeyActive: boolean = false
	let customKeyValue: string

	async function getMatrixProtocolData () {
		matrixProtocolDataList = await fetchMatrixProtocolData()
		console.log(matrixProtocolDataList)
		stage = 1
	}

	async function askForUserApproval (matrixProtocolNameElement: EventTarget | null) {
		activeMatrixProtocol = (matrixProtocolNameElement as HTMLElement).innerHTML
		stage = 2
	}

	async function startMatrixGeneration () {
		matrixProtocolData = matrixProtocolDataList.find(el => el.name == activeMatrixProtocol)!
		matrixProtocolIteration = 0
		stage = 3

		matrix = Array(matrixProtocolIteration)

		keydownListenerAbort = new AbortController()

		document.body.addEventListener("keydown", async (keypress) => {
			if (capsLockActive) {
				capsLockActive = keypress.getModifierState("CapsLock")
				return
			}

			capsLockActive = keypress.getModifierState("CapsLock")

			if (customKeyActive) return


			keypress.preventDefault()

			// ignore a keypress if the button is held or if the code currently tries to detect Alt Gr
			if (keypress.repeat || altGrCheck) return

			let keytext = `${keypress.key} (${keypress.code})`

			// Alt Gr emits a ctrl press and then Alt Gr (No way to distinguish from normal ctrl)
			// waits until keyup if next key is alt gr
			// TODO: better solution
			if (keypress.code == "ControlLeft") {
				altGrCheck = true

				let keyupCtrlAbort: AbortController = new AbortController()
				let keydownAltGrAbort: AbortController = new AbortController()

				let result = await Promise.any([
					new Promise(( resolve ) => document.body.addEventListener("keyup", ( key ) => { if (key.code == "ControlLeft") resolve("ctrl") }, { signal: keyupCtrlAbort.signal })) as Promise<string>,
					new Promise(( resolve ) => document.body.addEventListener("keydown", ( key ) => { if (key.code == "AltRight") resolve("AltGraph (AltRight)") }, { signal: keydownAltGrAbort.signal })) as Promise<string>
				])

				keyupCtrlAbort.abort()
				keydownAltGrAbort.abort()

				if (result != "ctrl") keytext = result

				altGrCheck = false
			}

			resolvePhysicalKeypress?.(keytext)
			resolvePhysicalKeypress = undefined
		}, { signal: keydownListenerAbort.signal })

		for (matrixProtocolIteration = 0; matrixProtocolIteration < matrixProtocolData.iterations; matrixProtocolIteration++) {	
			executeMatrixProtocolIteration(activeMatrixProtocol, matrixProtocolIteration)
			let key: string | null = await Promise.any([
				new Promise(( resolve ) => resolveVirtualKeypress = resolve) as Promise<string | null>,
				new Promise(( resolve ) => resolvePhysicalKeypress = resolve) as Promise<string>
			])

			if (key == "*Cancel") return
			else if (key == "*Back") matrixProtocolIteration -= 2
			else matrix[matrixProtocolIteration] = key
		}

		keydownListenerAbort.abort()

		stage = 4
	}

	function endCustomKey () {
		resolveVirtualKeypress?.("Custom Key: " + customKeyValue)
		resolveVirtualKeypress = null

		// document.getElementById("matrix-body")?.style.opacity = 1
		customKeyValue = ""
		customKeyActive = false
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
	<button on:click={getMatrixProtocolData}>Start</button>
{:else if stage === 1}
	{#each matrixProtocolDataList as matrixProtocol}
		<button on:click={(event) => askForUserApproval(event.target)} disabled={!matrixProtocol.detected}>{matrixProtocol.name}</button>
	{/each}
	<button on:click={getMatrixProtocolData}>Redetect</button>
{:else if stage === 2}
	<p>Do you want to start the matrix generation?</p>
	<button on:click={() => startMatrixGeneration()}>Start</button>
{:else if stage === 3}
	{#if capsLockActive && !customKeyActive}
		<div class="overlay">
			Please disable CapsLock before resuming the matrix generation
		</div>
	{/if}
	<p>Your keys will now light up one after another. Click the corresponding key on the screen or on your keyboard. When nothing lights up click "Skip Key".</p>
	<p>When the FN or Print key lights up, you have to click it on the screen, because the app can't detect the keypress.</p>
	<p>Progress: { (matrixProtocolIteration / (matrixProtocolData.iterations)) * 100 }% ({ matrixProtocolIteration }/{ matrixProtocolData.iterations })</p>
	<button on:click={() => { resolveVirtualKeypress?.("FN key"); resolveVirtualKeypress = null }}>FN</button>
	<button on:click={() => { resolveVirtualKeypress?.("Print"); resolveVirtualKeypress = null }}>Print</button>
	<button on:click={() => { customKeyActive = true }}>Custom Key</button>
	<br>
	<button on:click={() => { resolveVirtualKeypress?.(null); resolveVirtualKeypress = null }}>Skip Key</button>
	<button on:click={() => { resolveVirtualKeypress?.("*Back"); resolveVirtualKeypress = null }} disabled={matrixProtocolIteration == 0}>Back</button>

	{#if customKeyActive}
	<div class="overlay">
		<input bind:value={customKeyValue} type="text" id="custom-key-input">
		<button on:click={endCustomKey} disabled={!Boolean(customKeyValue)}>Done</button>
		<button on:click={() => {customKeyActive = false; customKeyValue = ""}}>Cancel Custom Key</button>
	</div>
	{/if}
{:else if stage === 4}
	<p>The matrix generation is now done, click on the download button to download the data</p>
	<button on:click={() => downloadJSON(`${activeMatrixProtocol}-matrix.json`, { ...matrix })}>Download</button>
{/if}

{#if stage !== 0}
	<div class="footer">
		<button on:click={() => {
			stage = 0
			resolveVirtualKeypress?.("*Cancel")
			resolveVirtualKeypress = null
		}}>Cancel</button>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 100;
		background-color: white;
		opacity: 0.90;

		/* align */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.footer {
		position: fixed;
		bottom: 0;

		width: 100%;
		height: 10%;

		/* align */
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
