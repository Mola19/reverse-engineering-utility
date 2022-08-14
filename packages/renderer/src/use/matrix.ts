import type { CustomWindow } from "./window"
declare const window: CustomWindow

export const { fetchMatrixProtocolNames, fetchMatrixProtocolData, executeMatrixProtocolIteration } = window.matrix
