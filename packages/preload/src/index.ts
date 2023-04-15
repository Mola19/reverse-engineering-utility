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

const app = {
	async openUserData (subpath: string) {
		const data = await ipcRenderer.invoke("openUserData", subpath)
		return data
	}
}

contextBridge.exposeInMainWorld("matrix", matrix)
contextBridge.exposeInMainWorld("app", app)
