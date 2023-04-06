import { ipcMain } from "electron"
import { getMatrixProtocols } from "./_utils"

ipcMain.handle("fetchMatrixProtocolData", async () => {
	const matrixProtocolData = await getMatrixProtocols()
	return matrixProtocolData.map(el => ({ ...el, detect: null, init: null, fn: null }))
})

ipcMain.handle("initMatrixProtocol", async ( _event, matrixProtocolName: string ) => {
	const matrixProtocols = await getMatrixProtocols()
	const matrixProtocolData = matrixProtocols.find(el => el.name == matrixProtocolName)!

	matrixProtocolData.init!()
})

ipcMain.handle("executeMatrixProtocolIteration", async ( _event, matrixProtocolName: string, iteration: number ) => {
	const matrixProtocols = await getMatrixProtocols()
	const matrixProtocolData = matrixProtocols.find(el => el.name == matrixProtocolName)!

	matrixProtocolData.fn!(iteration)
})
