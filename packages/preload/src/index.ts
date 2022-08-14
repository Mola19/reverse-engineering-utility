import { contextBridge } from "electron"
import { ipcRenderer } from "electron"

const matrix = {
	async fetchMatrixProtocolNames () {
		const data = await ipcRenderer.invoke("fetchMatrixProtocolNames")
		return data
	},
	async fetchMatrixProtocolData (matrixProtocolName: string) {
		const data = await ipcRenderer.invoke("fetchMatrixProtocolData", matrixProtocolName)
		return data
	},
	async executeMatrixProtocolIteration (matrixProtocolName: string, iteration: number) {
		const data = await ipcRenderer.invoke("executeMatrixProtocolIteration", matrixProtocolName, iteration)
		return data
	}
}

contextBridge.exposeInMainWorld("matrix", matrix)
