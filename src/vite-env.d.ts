/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_SHOW_RESUME?: string
  readonly VITE_RESUME_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
