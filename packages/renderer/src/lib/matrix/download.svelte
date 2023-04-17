<script lang="ts">
	import { activeMatrixProtocolName, matrix } from "./matrix-protocol"
	import Cancel from "../cancel.svelte"
	import LongTitle from "$lib/selector/long-title.svelte"

	function downloadJSON (filename: string, data: object) {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, "\t") + "\n")
		const downloadAnchorNode = document.createElement("a")
		downloadAnchorNode.setAttribute("href", dataStr)
		downloadAnchorNode.setAttribute("download", filename)
		downloadAnchorNode.click()
		downloadAnchorNode.remove()
	}
</script>


<LongTitle title={[ "The matrix generation is now done.", "Click on the download button to download the data."]}>
	<button on:click={() => downloadJSON(`${$activeMatrixProtocolName}-matrix.json`, { ...$matrix })}>Download</button>
	<Cancel />
</LongTitle>
