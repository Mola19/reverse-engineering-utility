/* - Matrix - */
interface Matrix {
	fetchMatrixProtocolData (): Promise<FrontMatrixProtocol[]>
	initMatrixProtocol ( matrixProtocolName: string ): void
	executeMatrixProtocolIteration ( matrixProtocolName: string, iteration: number ): void
}

interface App {
	openUserData ( subpath: string ): Promise<void>
}

export interface CustomWindow extends Window {
	matrix: Matrix,
	app: App
}
