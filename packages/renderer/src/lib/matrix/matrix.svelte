<script lang="ts">
	import Overlay from "$lib/overlay.svelte"
	import { executeMatrixProtocolIteration } from "$use/matrix"
	import { activeMatrixProtocolName, activeMatrixProtocol, matrix } from "./matrix-protocol"
	import Cancel from "../cancel.svelte"
	import { STAGE, stage } from "./stage"

	let capsLockActive: boolean = false
	let customKeyActive: boolean = false

	let customKeyValue = ""
	function endCustomKey () {
		matrix.update(( keys ) => keys.concat(`Custom Key: ${customKeyValue}`))

		customKeyValue = ""
		customKeyActive = false
	}

	function addKey ( keytext: string | null ) {
		if ($matrix.length >= $activeMatrixProtocol.iterations) return
		matrix.update(( keys ) => keys.concat(keytext))
	}

	let altGrCheck = false
	async function handleKey ( keyEvent: KeyboardEvent ) {
		if (customKeyActive) return

		if (keyEvent.key === "CapsLock") {
			capsLockActive = !capsLockActive
			if (capsLockActive) {
				addKey(`${keyEvent.key} (${keyEvent.code})`)
			}
			return
		}

		capsLockActive = keyEvent.getModifierState("CapsLock")
		if (capsLockActive) return

		if (keyEvent.repeat || altGrCheck) return
		if (keyEvent.code == "ControlLeft") {
			altGrCheck = true

			const keyupCtrlAbort = new AbortController()
			const keydownAltGrAbort = new AbortController()

			const result: null | KeyboardEvent = await Promise.any([
				new Promise(( resolve ) => document.body.addEventListener("keyup", ( key ) => { if (key.code == "ControlLeft") resolve(null) }, { signal: keyupCtrlAbort.signal })) as Promise<null>,
				new Promise(( resolve ) => document.body.addEventListener("keydown", ( key ) => { if (key.code == "AltRight") resolve(key) }, { signal: keydownAltGrAbort.signal })) as Promise<KeyboardEvent>
			])

			keyupCtrlAbort.abort()
			keydownAltGrAbort.abort()

			const altKeyEvent = result || keyEvent
			const keytext = `${altKeyEvent.key} (${altKeyEvent.code})`
			addKey(keytext)

			altGrCheck = false
		} else {
			const keytext = `${keyEvent.key} (${keyEvent.code})`
			addKey(keytext)
		}
	}

	const cleanSubscribe = matrix.subscribe(( keys ) => executeMatrixProtocolIteration($activeMatrixProtocolName, keys.length))
	matrix.subscribe(console.log)

	function cleanup () {
		cleanSubscribe()
	}

	function done () {
		cleanup()
		stage.set(STAGE.download)
	}
</script>

<svelte:body on:keydown={handleKey} />

{#if capsLockActive && !customKeyActive}
	<Overlay>
		Please disable CapsLock before resuming the matrix generation
	</Overlay>
{/if}

<div class="main">
	<p>Your keys will now light up one after another. Click the corresponding key on the screen or on your keyboard. When nothing lights up click "Skip Key".</p>
	<p>When the FN or Print key lights up, you have to click it on the screen, because the app can't detect the keypress.</p>
	<p>Progress: { ($matrix.length / ($activeMatrixProtocol.iterations)) * 100 }% ({ $matrix.length }/{ $activeMatrixProtocol.iterations })</p>

	<button on:click={() => addKey("Fn Key")}>FN</button>
	<button on:click={() => addKey("Print")}>Print</button>
	<button disabled={$matrix.length >= $activeMatrixProtocol.iterations} on:click={() => customKeyActive = true}>Custom Key</button>
	<br />
	<button on:click={() => addKey(null)}>Skip Key</button>
	<button on:click={() => matrix.update(( keys ) => keys.slice(0, -1))} disabled={$matrix.length === 0}>Back</button>
	<br />
	<button disabled={$matrix.length < $activeMatrixProtocol.iterations} on:click={done}>done</button>
</div>

{#if customKeyActive}
	<Overlay>
		<input bind:value={customKeyValue} type="text" id="custom-key-input">
		<button on:click={endCustomKey} disabled={!customKeyValue}>Done</button>
		<button on:click={() => {customKeyActive = false; customKeyValue = ""}}>Cancel Custom Key</button>
	</Overlay>
{/if}

<Cancel on:cancel={cleanup} />
