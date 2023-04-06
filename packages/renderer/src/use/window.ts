/* - Matrix - */
interface Matrix {
	fetchMatrixProtocolData (): Promise<MatrixProtocol[]>
	executeMatrixProtocolIteration (matrixProtocolName: string, iteration: number): void
}

export interface CustomWindow extends Window {
	matrix: Matrix
}
