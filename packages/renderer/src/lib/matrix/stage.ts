import { writable } from "svelte/store"

export const enum STAGE {
	init = 0,
	selectProtocol = 1,
	initMatrix = 2,
	matrix = 3,
	download = 4
}

export const stage = writable<STAGE>(STAGE.init)
