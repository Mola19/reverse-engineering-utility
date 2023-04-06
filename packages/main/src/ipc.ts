import { ipcMain } from "electron"
import { getMatrixProtocols } from "./_utils"

ipcMain.handle("fetchMatrixProtocolData", async () => {
	const matrixProtocolData = await getMatrixProtocols()
	return matrixProtocolData.map(el => ({ ...el, detect: null, fn: null }))
})

ipcMain.handle("executeMatrixProtocolIteration", async ( _event, matrixProtocolName: string, iteration: number ) => {
	const matrixProtocols = await getMatrixProtocols()
	const matrixProtocolData = matrixProtocols.find(el => el.name == matrixProtocolName)!

	matrixProtocolData.fn!(iteration)
})
