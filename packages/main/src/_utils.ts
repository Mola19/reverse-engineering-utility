import { readdir } from "node:fs/promises"
import { join as joinPath } from "node:path"

export async function getAvailableMatrixProtocols () {
	const files = await readdir(__dirname + "/matrix-protocols/")

	let matrixProtocols: MatrixProtocol[] = []
	for (const file of files) {
		const path = joinPath(__dirname, "matrix-protocols", file)

		const matrixProtocol: MatrixProtocol = require(path)
		if (matrixProtocol.detected == null) matrixProtocol.detect() 
		if (matrixProtocol.detected) matrixProtocols.push(matrixProtocol)
	}

	return matrixProtocols
}
