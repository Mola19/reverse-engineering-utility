<script lang="ts">
	import { fade } from "svelte/transition"
	import { MODE, current } from "$pages/page"

	function select ( page: MODE ) {
		current.set(page)
		toggle()
	}

	let isActive = false
	function toggle () {
		isActive = !isActive
	}
</script>


<!-- <svelte:body style="overflow: hidden;" /> -->

<div class="wrap">
	
	<div on:click={toggle} on:keydown={toggle} class="oven">
		<div class="veggie-oven {isActive ? "active" : ""}">
			<div class="line" />
			<div class="line" />
			<div class="line" />
		</div>
	</div>
	
	{#if isActive}
		<div on:click={toggle} on:keydown={toggle} on:touchmove|passive={( ev ) => ev.preventDefault()} class="obscure">
			<div transition:fade={{ duration: 50 }} on:keydown|stopPropagation on:click|stopPropagation class="links">
				<div on:click={() => select(MODE.matrix)} on:keydown={() => select(MODE.matrix)} class="lnk">matrix</div>
				<!-- <span class="div" /> -->
			</div>
		</div>
	{/if}

</div>


<style>
	.wrap {
		position: relative;
	}

	.oven {
		background-color: #000;

		height: 60px;
		width: 60px;
		font-size: 20px;
		margin: 17px 30px 0 0;
		padding: 15px;
		box-sizing: border-box;

		cursor: pointer;
	}

	.line {
		height: 5px;
		margin-bottom: 7.5px;
		width: 100%;
		background-color: #fff;
		-webkit-transition: all 0.3s ease-in-out;
		-o-transition: all 0.3s ease-in-out;
		transition: all 0.3s ease-in-out;
	}

	.line:last-child {
		margin-bottom: 0;
	}

	.veggie-oven.active .line:nth-child(2){
		opacity: 0;
	}

	.veggie-oven.active .line:nth-child(1){
		-webkit-transform: translateY(13px) rotate(45deg);
		-ms-transform: translateY(13px) rotate(45deg);
		-o-transform: translateY(13px) rotate(45deg);
		transform: translateY(13px) rotate(45deg);
	}

	.veggie-oven.active .line:nth-child(3){
		-webkit-transform: translateY(-13px) rotate(-45deg);
		-ms-transform: translateY(-13px) rotate(-45deg);
		-o-transform: translateY(-13px) rotate(-45deg);
		transform: translateY(-13px) rotate(-45deg);
	}

	.obscure {
		position: fixed;
		top: 77px;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.4);
		background-attachment: fixed;
		cursor: pointer;
	}

	.links {
		background-color: #fff;
	}

	.links > .lnk {
		display: block;
		padding: 10px 0 10px 40px;
		font-size: var(--header-font-size);
		color: #000;
		text-decoration: none;
		transition: .2s color;
		box-sizing: border-box;
	}

	.links > .lnk:hover, .links > .lnk:focus {
		color: var(--main-accent);
	}

	.links > .lnk:last-child {
		padding-bottom: 15px !important;
	}

	/* divider */
	/* .links > .div {
		display: block;
		height: 1px;
		width: calc(100% - 40px);
		margin: 0 20px;
		background-color: #ccc;
	} */
</style>
