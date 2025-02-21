declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';

/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL: string;

	// add more environment variables here if needed
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
