import { ipcMain } from "electron"
import { getAvailableMatrixProtocols } from "./_utils"

ipcMain.handle("fetchMatrixProtocolNames", async () => {
	const matrixProtocols = await getAvailableMatrixProtocols()
	return matrixProtocols.map(({ name }) => name)
})

ipcMain.handle("fetchMatrixProtocolData", async ( _event, matrixProtocolName: string ) => {
	const matrixProtocols = await getAvailableMatrixProtocols()
	const matrixProtocolData = matrixProtocols.find(el => el.name == matrixProtocolName)!
	return { ...matrixProtocolData, detect: null, fn: null }
})

ipcMain.handle("executeMatrixProtocolIteration", async ( _event, matrixProtocolName: string, iteration: number ) => {
	const matrixProtocols = await getAvailableMatrixProtocols()
	const matrixProtocolData = matrixProtocols.find(el => el.name == matrixProtocolName)!

	matrixProtocolData.fn(iteration)
})
