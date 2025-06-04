// global.d.ts
export {};

declare global {
  interface Window {
    electronAPI?: {
      focusAppWindow?: () => void;
      // add other methods or properties as needed
    };
  }
}