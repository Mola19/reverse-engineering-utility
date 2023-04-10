import { writable } from "svelte/store"
import { fetchMatrixProtocolData } from "$use/matrix"
import { STAGE, stage } from "./stage"

export const activeMatrixProtocolName = writable<string>()
export const matrixProtocolDataList = writable<FrontMatrixProtocol[]>([])

export const matrix = writable<(string | null)[]>([])
export const activeMatrixProtocol = writable<FrontMatrixProtocol>()

export async function setMatrixProtocolDataList () {
	const matrixList = await fetchMatrixProtocolData()
	matrixProtocolDataList.set(matrixList)
	stage.set(STAGE.selectProtocol)
}
