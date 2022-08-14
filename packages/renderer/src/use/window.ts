/* - Matrix - */
interface Matrix {
	fetchMatrixProtocolNames (): Promise<string[]>
	fetchMatrixProtocolData (matrixProtocolName: string): Promise<MatrixProtocol>
	executeMatrixProtocolIteration (matrixProtocolName: string, iteration: number): void
}

export interface CustomWindow extends Window {
	matrix: Matrix
}
