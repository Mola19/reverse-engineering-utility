import { mkdir, readFile, readdir, writeFile } from "node:fs/promises"
import { join as joinPath } from "node:path"
import { app } from "./index.js"
import { existsSync } from "node:fs"
// @ts-expect-error
import npm from "../../../node_modules/npm/lib/cli.js"

declare function npm ( process: NodeJS.Process ): Promise<void>

export function getUserData ( ...path: string[] ) {
	const userData = app.getPath("userData")
	return joinPath(userData, ...path)
}

const npmWait: Set<() => void> = new Set
export const waitNpm = () => new Promise<void>(( resolve ) => npmWait.add(resolve))

export let isNpmInstall = false
export async function npmInstall () {
	if (isNpmInstall) return await waitNpm()

	isNpmInstall = true

	const protocolDir = getUserData("matrix-protocols")

	const files = await readdir(protocolDir)
	const jsFiles = files.filter(( file ) => file.endsWith(".js"))
	const jsonFiles = jsFiles.map(( jsFile ) => joinPath(protocolDir, jsFile.replace(/.js$/, ".json")))

	const content = await Promise.all(jsonFiles.map(( jsonFile ) => existsSync(jsonFile) && readFile(jsonFile)))
	const json = content.filter(( file ) => file).map(( file ) => JSON.parse(file.toString()))
	const deps = json.map(({ dependencies }) => dependencies || []).flat()
	const dependencies = Object.fromEntries(deps.map(( dep ) => [ dep, "latest" ]))

	const pkg = {
		name: "reverse-engineering-matrix-protocols",
		dependencies: dependencies,
		type: "commonjs",
		private: true
	}

	await writeFile(joinPath(protocolDir, "package.json"), JSON.stringify(pkg, null, "\t"))

	const oldCwd = process.cwd()
	const oldArgv = process.argv
	// const oldExit = process.exit

	process.chdir(protocolDir)
	process.argv = [ process.argv[0]!, "npm", "install" ]

	// @ts-expect-error
	process.exit = ( code ) => console.trace("trace exit", code)

	await npm(process)
	console.log("npm done")

	process.chdir(oldCwd)
	process.argv = oldArgv
	// process.exit = oldExit

	isNpmInstall = false
	npmWait.forEach(( resolve ) => resolve())
	npmWait.clear()
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
