<script lang="ts">
	import type { IconDefinition } from "@fortawesome/fontawesome-common-types"

	export let icon: IconDefinition
	export let height = "inherit"
	export let color = "currentColor"

	$: i = icon.icon
	$: path = i[4] as string
</script>


<svg on:keydown on:click style="height: {height}" viewBox={`0 0 ${i[0]} ${i[1]}`} role="img" xmlns="http://www.w3.org/2000/svg">
	<g transform={`translate(${i[0] / 2} ${i[1] / 2})`}>
		<g>
			<path d={path} fill={color} transform={`translate(${i[0] / -2} ${i[1] / -2})`} />
		</g>
	</g>
</svg>


<style>
	svg {
		display: inline-block;
		height: inherit;
		transform-origin: center;
		overflow: visible;
		cursor: pointer;
	}

	svg:hover {
		color: var(--tmp-hightlight-background-color, inherit);
	}
</style>
