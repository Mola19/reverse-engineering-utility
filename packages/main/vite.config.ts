import { defineConfig } from "vite"
import { builtinModules } from "module"
import { join as joinPath } from "node:path"
import { viteStaticCopy } from "vite-plugin-static-copy"

export default defineConfig({
	plugins: [
		viteStaticCopy({
			targets: [{
				src: ["src/matrix-protocols"],
				dest: "."
			}]
		})
	],
	mode: process.env.MODE,
	root: __dirname,
	build: {
		sourcemap: process.env.MODE == "development",
		target: "esnext",
		outDir: joinPath(__dirname, "dist"),
		minify: process.env.MODE != "development",
		lib: {
			entry: "src/index.ts",
			formats: [ "cjs" ],
		},
		rollupOptions: {
			external: [
				"electron",
				"node-hid",
				...builtinModules.flatMap(( m ) => [ m, `node:${m}` ])
			],
			output: {
				entryFileNames: "[name].js",
				chunkFileNames: "[name].[hash].js"
			}
		},
		emptyOutDir: true,
		reportCompressedSize: false
	}
})
