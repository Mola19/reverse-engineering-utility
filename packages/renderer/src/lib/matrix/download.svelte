<script lang="ts">
	import { activeMatrixProtocolName, matrix } from "./matrix-protocol"
	import Cancel from "../cancel.svelte"

	function downloadJSON (filename: string, data: object) {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, "\t") + "\n")
		const downloadAnchorNode = document.createElement("a")
		downloadAnchorNode.setAttribute("href", dataStr)
		downloadAnchorNode.setAttribute("download", filename)
		downloadAnchorNode.click()
		downloadAnchorNode.remove()
	}
</script>


<p>The matrix generation is now done, click on the download button to download the data</p>
<button on:click={() => downloadJSON(`${$activeMatrixProtocolName}-matrix.json`, { ...$matrix })}>Download</button>

<Cancel />
