<script lang="ts">
	import LongTitle from "$lib/selector/long-title.svelte"
	import Loading from "./lib/loading.svelte"
	import { setMatrixProtocolDataList } from "./matrix-protocol"
</script>


<LongTitle --tmp-font-size="1.5em" title="Start matrix generation">
	<button on:click={setMatrixProtocolDataList}>Start</button>
</LongTitle>

<Loading />
