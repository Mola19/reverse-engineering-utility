import { mkdir, readdir } from "node:fs/promises"
import { join as joinPath } from "node:path"
import { app } from "./index.js"
import { existsSync } from "node:fs"

export function getUserData ( ...path: string[] ) {
	const userData = app.getPath("userData")
	return joinPath(userData, ...path)
}

export async function getMatrixProtocols () {
	const protocolDir = getUserData("matrix-protocols")
	if (!existsSync(protocolDir)) await mkdir(protocolDir, { recursive: true })

	const files = await readdir(protocolDir)
	const jsFiles = files.filter(( file ) => file.endsWith(".js"))

	let matrixProtocols: MatrixProtocol[] = []
	for (const file of jsFiles) {
		const path = joinPath(protocolDir, file)

		const matrixProtocol: MatrixProtocol = require(path)
		matrixProtocols.push(matrixProtocol)
	}

	return matrixProtocols
}
