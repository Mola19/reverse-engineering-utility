<div class="wrap">
	<slot />
</div>


<style>
	.wrap {
		position: absolute;
		top: 15vh;
		right: 15vh;
		bottom: 15vh;
		left: 15vh;
	}

	.wrap :global(div.btn), .wrap :global(button) {
		display: block;
		width: 100%;

		font-size: 1em;
		text-align: center;

		height: 41px;
		padding: 10px;
		box-sizing: border-box;

		background-color: var(--element-background-color);
		border: none;
		border-radius: var(--border-radius);
	}

	.wrap :global(div.btn):hover, .wrap :global(button):not(:disabled):hover {
		background-color: var(--highlight-background-color);
		cursor: pointer;
	}
</style>
