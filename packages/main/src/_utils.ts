import { mkdir, readdir } from "node:fs/promises"
import { join as joinPath } from "node:path"
import { app } from "./index.js"
import { existsSync } from "node:fs"

export async function getMatrixProtocols () {
	const userData = app.getPath("userData")
	const protocolDir = joinPath(userData, "matrix-protocols")
	if (!existsSync(protocolDir)) await mkdir(protocolDir, { recursive: true })

	const files = await readdir(protocolDir)

	let matrixProtocols: MatrixProtocol[] = []
	for (const file of files) {
		const path = joinPath(protocolDir, file)

		const matrixProtocol: MatrixProtocol = require(path)
		matrixProtocols.push(matrixProtocol)
	}

	return matrixProtocols
}
