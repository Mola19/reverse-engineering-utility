interface Matrix {
	npmInstall (): Promise<void>
	fetchMatrixProtocolData (): Promise<FrontMatrixProtocol[]>
	initMatrixProtocol ( matrixProtocolName: string ): Promise<void>
	executeMatrixProtocolIteration ( matrixProtocolName: string, iteration: number ): Promise<void>
}

interface App {
	openUserData ( subpath: string ): Promise<void>
}
