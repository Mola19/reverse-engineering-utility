<script lang="ts">
	import { PAGE, page } from "$pages/page"
	import { faHouse } from "@fortawesome/free-solid-svg-icons"
	import Icon from "./icon.svelte"
</script>


<div class="head">

	<div class="icon">
		<Icon
			--tmp-hightlight-background-color="var(--highlight-background-color)"
			on:keydown={() => page.set(PAGE.home)}
			on:click={() => page.set(PAGE.home)}
			icon={faHouse}
			height="40px"
		/>
	</div>

</div>


<style>
	.head {
		position: relative;
	}

	.icon {
		padding: 20px;
	}
</style>
