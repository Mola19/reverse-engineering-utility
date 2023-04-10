import { writable } from "svelte/store"

export const enum PAGE {
	home = "home",
	matrix = "matrix"
}

export const page = writable<PAGE>(PAGE.home)
