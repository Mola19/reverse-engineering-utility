import type { CustomWindow } from "./window"
declare const window: CustomWindow

export const { fetchMatrixProtocolData, initMatrixProtocol, executeMatrixProtocolIteration } = window.matrix
