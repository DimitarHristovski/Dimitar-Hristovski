/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BIRTHDAY_MONTH?: string;
  readonly VITE_BIRTHDAY_DAY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
