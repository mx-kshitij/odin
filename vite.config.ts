import { defineConfig, ResolvedConfig, UserConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            formats: ["es"],
            entry: {
                main: "src/main/index.ts",
                dockablepane: "src/ui/odin.tsx"
            }
        },
        rollupOptions: {
            external: ["@mendix/component-framework", "@mendix/model-access-sdk"]
        },
        outDir: "./dist/odin",
        sourcemap: true 
    }
} satisfies UserConfig);
