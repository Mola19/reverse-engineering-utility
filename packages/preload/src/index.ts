import { contextBridge } from "electron"
import { ipcRenderer } from "electron"

const matrix = {
	async fetchMatrixProtocolData () {
		const data = await ipcRenderer.invoke("fetchMatrixProtocolData")
		return data
	},
	async initMatrixProtocol (matrixProtocolName: string) {
		const data = await ipcRenderer.invoke("initMatrixProtocol", matrixProtocolName)
		return data
	},
	async executeMatrixProtocolIteration (matrixProtocolName: string, iteration: number) {
		const data = await ipcRenderer.invoke("executeMatrixProtocolIteration", matrixProtocolName, iteration)
		return data
	}
}

contextBridge.exposeInMainWorld("matrix", matrix)
