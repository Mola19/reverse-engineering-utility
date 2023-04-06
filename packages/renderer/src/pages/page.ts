import { writable } from "svelte/store"

export const enum MODE {
	home = "home",
	matrix = "matrix"
}

export const current = writable<MODE>(MODE.home)
