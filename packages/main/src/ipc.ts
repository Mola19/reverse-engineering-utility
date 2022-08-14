import { ipcMain } from "electron"
import { getAllMatrixProtocols } from "./_utils"

ipcMain.handle("fetchMatrixProtocolNames", async () => {
	const matrixProtocols = await getAllMatrixProtocols()
	return matrixProtocols.map(({ name }) => name)
})

ipcMain.handle("fetchMatrixProtocolData", async ( _event, matrixProtocolName: string ) => {
	const matrixProtocols = await getAllMatrixProtocols()
	const matrixProtocolData = matrixProtocols.find(el => el.name == matrixProtocolName)!
	return { ...matrixProtocolData, fn: null }
})

ipcMain.handle("executeMatrixProtocolIteration", async ( _event, matrixProtocolName: string, iteration: number ) => {
	const matrixProtocols = await getAllMatrixProtocols()
	const matrixProtocolData = matrixProtocols.find(el => el.name == matrixProtocolName)!

	matrixProtocolData.fn(iteration)
})
