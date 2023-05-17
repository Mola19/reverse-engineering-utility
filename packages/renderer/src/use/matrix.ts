import type { CustomWindow } from "./window"
declare const window: CustomWindow

export const { npmInstall, fetchMatrixProtocolData, initMatrixProtocol, executeMatrixProtocolIteration } = window.matrix
