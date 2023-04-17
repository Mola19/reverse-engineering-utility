<script lang="ts">
	import Overlay from "$lib/overlay.svelte"
	import { executeMatrixProtocolIteration } from "$use/matrix"
	import { activeMatrixProtocolName, activeMatrixProtocol, matrix } from "./matrix-protocol"
	import Cancel from "../cancel.svelte"
	import { STAGE, stage } from "./stage"
	import Wrap from "$lib/selector/wrap.svelte"

	let customKeyActive = false
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

	let capsLockActive = false
	let capsLockNum = 0
	let altGrCheck = false
	async function handleKey ( keyEvent: KeyboardEvent ) {
		if (customKeyActive) return

		if (keyEvent.key === "CapsLock") {
			capsLockActive = !capsLockActive
			if (capsLockActive) {
				capsLockNum = 0
				addKey(`${keyEvent.key} (${keyEvent.code})`)
			}

			return
		}

		capsLockActive = keyEvent.getModifierState("CapsLock")
		if (capsLockActive) {
			capsLockNum += 1
			return
		}

		if (keyEvent.repeat || altGrCheck) return
		if (keyEvent.code == "ControlLeft") {
			altGrCheck = true

			const altGrCtrlAbort = new AbortController()
			const result: null | KeyboardEvent = await Promise.any([
				new Promise<null>(( resolve ) => (
					document.body.addEventListener("keyup", ( key ) => (key.code == "ControlLeft") && resolve(null), { signal: altGrCtrlAbort.signal })),
				),
				new Promise<KeyboardEvent>(( resolve ) => (
					document.body.addEventListener("keydown", ( key ) => (key.code == "AltRight") && resolve(key), { signal: altGrCtrlAbort.signal }))
				)
			])

			altGrCtrlAbort.abort()

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

	function cleanup () {
		cleanSubscribe()
	}

	function done () {
		cleanup()
		stage.set(STAGE.download)
	}

	function slice () {
		matrix.update(( keys ) => keys.slice(0, -1))
	}

	function unfocus ( ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		ev.currentTarget.blur()
	}

	$: isDone = ( $matrix.length >= $activeMatrixProtocol.iterations )
</script>


<svelte:body on:keydown={handleKey} />

<Wrap>
	<div class="txt">
		<p>
			Your keys will now light up one after another.
			Click the corresponding key on the screen or on your keyboard.
		</p>
		<p>
			When nothing lights up, click <strong>"Skip Key"</strong>.
			<br />
			When done, click <strong>"Done"</strong>.
		</p>
		<p>
			When the <strong>FN</strong> or <strong>Print</strong> key lights up,
			you have to click the corresponding button, because the app can't detect the keypress.
		</p>
		<p>Progress: {($matrix.length / $activeMatrixProtocol.iterations * 100 ).toFixed()}% ({$matrix.length}/{$activeMatrixProtocol.iterations})</p>
	</div>
	<div class="main">
		<div class="top">
			<button tabindex="-1" disabled={isDone} on:click={unfocus} on:click={() => addKey("Fn Key")}>[FN]</button>
			<button tabindex="-1" disabled={isDone} on:click={unfocus} on:click={() => addKey("Print")}>[Print]</button>

			<button tabindex="-1" disabled={isDone} on:click={unfocus} on:click={() => customKeyActive = true}>Custom Key</button>
			<button tabindex="-1" disabled={isDone} on:click={unfocus} on:click={() => addKey(null)}>Skip Key</button>
			<button tabindex="-1" disabled={$matrix.length === 0} on:click={unfocus} on:click={() => slice()}>Back</button>
		</div>

		<div class="bottom">
			<button tabindex="-1" disabled={$matrix.length <= 0} on:click={done}>Done</button>
			<Cancel tabindex={-1} on:cancel={cleanup} />
		</div>
	</div>
</Wrap>

{#if capsLockActive && !customKeyActive}
	<Overlay>
		<div class="caps-lock">
			<h3>Caps Lock is enabled.</h3>
			<h3>Please disable Caps Lock before resuming the matrix generation.</h3>
			{#if capsLockNum > 0}
				<div class="keypress">Your keypress was ignored ({capsLockNum}x).</div>
			{/if}
		</div>
	</Overlay>
{/if}

{#if customKeyActive}
	<Overlay>
		<div class="custom">
			<h3>Enter custom key</h3>
			<div class="input">
				<input placeholder="Enter custom key" bind:value={customKeyValue} type="text" id="custom-key-input">
				<button on:click={endCustomKey} disabled={!customKeyValue}>Done</button>
				<button on:click={() => { customKeyActive = false; customKeyValue = "" }}>Cancel Custom Key</button>
			</div>
		</div>
	</Overlay>
{/if}


<style>
	.custom, .caps-lock {
		height: 120px;
		width: 450px;
	}

	.caps-lock h3 {
		text-align: center;
	}

	.caps-lock h3:last-of-type {
		margin-bottom: var(--margin-gap);
	}

	.caps-lock > .keypress {
		text-align: center;
	}

	.custom h3 {
		text-align: center;
		margin-bottom: var(--select-gap);
	}

	.custom > .input {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		gap: var(--select-gap);
	}

	.input > input {
		flex-basis: 100%;
		display: block;
		height: 2rem;
		appearance: none;
		background-clip: padding-box;
		line-height: 1.5;
		border-style: solid;
		border-width: 2px;
		border-color: var(--element-background-color);
		border-radius: 6px;
		padding: 0 0.5rem 0 1rem;
	}

	.input > input:focus {
		outline: none;
		border-color: var(--highlight-background-color);
	}

	.input > button {
		flex-basis: calc(50% - var(--select-gap) / 2);

		display: block;
		width: 100%;

		font-size: 1em;
		height: 41px;
		padding: 10px;
		box-sizing: border-box;

		background-color: var(--element-background-color);
		border: none;
		border-radius: var(--border-radius);

		cursor: pointer;
		text-align: center;
	}

	.input > button:hover {
		background-color: var(--highlight-background-color);
	}

	.txt {
		font-size: 14px;
		margin-bottom: var(--margin-gap);
	}

	.txt p {
		margin-bottom: 4px;
	}

	.top {
		display: flex;
		flex-wrap: wrap;
		gap: var(--select-gap);
	}

	.top button:nth-of-type(1), .top button:nth-of-type(2) {
		flex-basis: calc(50% - var(--select-gap) / 2);
	}
	
	.top button:nth-of-type(3), .top button:nth-of-type(4), .top button:nth-of-type(5) {
		flex-basis: calc(33.3333333% - var(--select-gap) / 1.5);
	}

	.bottom {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		/* flex-wrap: wrap; */
		gap: var(--select-gap)
	}
</style>
