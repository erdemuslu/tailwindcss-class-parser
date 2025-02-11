// vite.config.js
import {resolve} from 'path'
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [dts()],
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'TailwindcssClassParser',
            formats: ["es", "umd"],
            // the proper extensions will be added
            fileName: format => `tailwindcss-class-parser.${format}.js`,
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['tailwindcss/resolveConfig'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    "tailwindcss/resolveConfig": 'tailwindcss',
                },
            },
        },
    }
})