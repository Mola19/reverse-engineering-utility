/* - Matrix - */
interface Matrix {
	fetchMatrixProtocolData (): Promise<MatrixProtocol[]>
	initMatrixProtocol (matrixProtocolName: string): void
	executeMatrixProtocolIteration (matrixProtocolName: string, iteration: number): void
}

export interface CustomWindow extends Window {
	matrix: Matrix
}
