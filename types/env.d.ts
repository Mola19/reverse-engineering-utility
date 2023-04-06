/// <reference types="vite/client" />
/// <reference types="svelte" />

interface ImportMetaEnv {
	readonly mode: "development" | "production"
	readonly VITE_DEV_SERVER_URL: undefined | string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

interface MatrixProtocol {
	name: string,
	iterations: number,
	detected: boolean | null,
	detect: (() => Promise<void> | void) | null,
	init: (() => Promise<void> | void) | null,
	fn: (( number: number ) => Promise<void> | void) | null,
}
