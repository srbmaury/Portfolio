/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_SHOW_RESUME?: string
  readonly VITE_RESUME_URL: string
  readonly VITE_HIDE_BEGINNER_PROJECTS?: string
  readonly VITE_HIDE_CUSTOM_CURSOR?: string
  readonly VITE_SHOW_TERMINAL?: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
