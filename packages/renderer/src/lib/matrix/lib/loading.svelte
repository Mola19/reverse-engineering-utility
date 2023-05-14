<script>
	import Overlay from "$lib/overlay.svelte"
	import { loading } from "../matrix-protocol"
</script>


{#if $loading}
	<Overlay>
		<div>loading ...</div>
	</Overlay>
{/if}
