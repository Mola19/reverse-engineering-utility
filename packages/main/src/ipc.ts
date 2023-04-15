import { ipcMain, shell } from "electron"
import { getMatrixProtocols } from "./_utils"
import { app } from "./index.js"
import { join as joinPath } from "node:path"

ipcMain.handle("fetchMatrixProtocolData", async () => {
	const matrixProtocolData = await getMatrixProtocols()
	await Promise.all(matrixProtocolData.map(matrixProtocol => matrixProtocol.detect!()))

	return matrixProtocolData.map(el => ({ ...el, detect: null, init: null, fn: null }))
})

ipcMain.handle("initMatrixProtocol", async ( _event, matrixProtocolName: string ) => {
	const matrixProtocols = await getMatrixProtocols()
	const matrixProtocolData = matrixProtocols.find(el => el.name == matrixProtocolName)!

	await matrixProtocolData.init!()
})

ipcMain.handle("executeMatrixProtocolIteration", async ( _event, matrixProtocolName: string, iteration: number ) => {
	const matrixProtocols = await getMatrixProtocols()
	const matrixProtocolData = matrixProtocols.find(el => el.name == matrixProtocolName)!

	await matrixProtocolData.fn!(iteration)
})

ipcMain.handle("openUserData", async ( _event, subpath: string ) => {
	const userData = app.getPath("userData")

	shell.openPath(joinPath(userData, subpath))
})
