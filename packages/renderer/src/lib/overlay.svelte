<div class="overlay">
	<slot />
</div>


<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 100;
		background-color: white;
		opacity: 0.90;

		cursor: var(--tmp-cursor, auto);

		/* align */
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
