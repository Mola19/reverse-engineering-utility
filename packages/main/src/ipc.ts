import { ipcMain, shell } from "electron"
import { getMatrixProtocols, getUserData, isNpmInstall, npmInstall, waitNpm } from "./_utils"

ipcMain.handle("npmInstall", async () => {
	await npmInstall()
})

ipcMain.handle("fetchMatrixProtocolData", async () => {
	if (isNpmInstall) await waitNpm()

	const matrixProtocolData = await getMatrixProtocols()
	await Promise.all(matrixProtocolData.map(( matrixProtocol ) => matrixProtocol.detect()))

	return matrixProtocolData.map(( el ) => ({ name: el.name, iterations: el.iterations, detected: el.detected })) as FrontMatrixProtocol[]
})

ipcMain.handle("initMatrixProtocol", async ( _event, matrixProtocolName: string ) => {
	const matrixProtocols = await getMatrixProtocols()
	const activeMatrixProtocol = matrixProtocols.find(( el ) => el.name == matrixProtocolName)!

	await activeMatrixProtocol.init()
})

ipcMain.handle("executeMatrixProtocolIteration", async ( _event, matrixProtocolName: string, iteration: number ) => {
	const matrixProtocols = await getMatrixProtocols()
	const activeMatrixProtocol = matrixProtocols.find(( el ) => el.name == matrixProtocolName)!

	await activeMatrixProtocol.fn(iteration)
})

ipcMain.handle("openUserData", async ( _event, subpath: string ) => {
	const pathOpen = getUserData(subpath)
	shell.openPath(pathOpen)
})
