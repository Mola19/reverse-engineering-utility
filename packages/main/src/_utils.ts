import { mkdir, readdir } from "node:fs/promises"
import { join as joinPath } from "node:path"
import { app } from "./index.js"
import { existsSync } from "node:fs"
// @ts-expect-error
import npm from "../../../node_modules/npm/lib/cli.js"

export function getUserData ( ...path: string[] ) {
	const userData = app.getPath("userData")
	return joinPath(userData, ...path)
}

const npmWait: (() => void)[] = []
let isNpmDone = false
export async function waitNpm () {
	if (isNpmDone) return

	return await new Promise<void>(( resolve ) => npmWait.push(resolve))
}

export async function npmInstall () {
	const protocolDir = getUserData("matrix-protocols")
	process.argv = [ process.argv[0]!, "npm", "install", "--prefix", protocolDir ]

	// @ts-expect-error
	process.exit = ( code ) => console.trace("trace exit", code)

	await npm(process)
	console.log("npm done")

	isNpmDone = true
	npmWait.forEach(( resolve ) => resolve())
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
