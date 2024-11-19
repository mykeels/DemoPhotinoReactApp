/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_API_ROOT: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
