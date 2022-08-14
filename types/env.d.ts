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
	fn ( number: number ): string[],
}
