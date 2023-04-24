interface MatrixProtocol {
	name: string,
	iterations: number,
	detected: boolean | null,
	detect: () => Promise<void> | void,
	init: () => Promise<void> | void,
	fn: ( number: number ) => Promise<void> | void,
}

type FrontMatrixProtocol = Omit<MatrixProtocol, "fn" | "init" | "fn">
