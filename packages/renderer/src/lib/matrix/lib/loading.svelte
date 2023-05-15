<script>
	import Overlay from "$lib/overlay.svelte"
	import { loading } from "../matrix-protocol"
</script>


{#if $loading}
	<Overlay --tmp-cursor="wait">
		<div>loading ...</div>
	</Overlay>
{/if}
