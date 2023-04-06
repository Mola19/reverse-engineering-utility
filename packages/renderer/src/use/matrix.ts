import type { CustomWindow } from "./window"
declare const window: CustomWindow

export const { fetchMatrixProtocolData, executeMatrixProtocolIteration } = window.matrix
