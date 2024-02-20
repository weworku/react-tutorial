import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    server: {
        open: true,
        // ポート変更の記述 host, portセットで必要
        host: "0.0.0.0",
        port: 3000,
    },
    plugins: [react()],
    root: "./",
    build: {
        outDir: "dist",
        // 以下、SSRの設定 必要に応じてコメントアウトを外す
        // ssrManifest: true,
        // ssr: true,
        // rollupOptions: {
        //     input: {
        //         main: "./index.html",
        //     },
        // },
    },
    base: "/",
    publicDir: "./public",
})