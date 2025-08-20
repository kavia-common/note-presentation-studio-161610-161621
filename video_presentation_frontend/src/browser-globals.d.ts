/* eslint-disable @typescript-eslint/triple-slash-reference */
//
// Provide minimal ambient declarations to satisfy TypeScript without requiring lib.dom
// and prevent ESLint no-undef by not referencing DOM type names directly.
//
declare global {
  // Use 'any' to avoid referencing DOM lib types which trigger no-undef in this CI environment
  // These are only for typing within the editor; runtime is provided by the browser.
  const window: any;
  const document: any;
  const location: any;
  const navigator: any;
  const URLSearchParams: any;
  const localStorage: any;

  type File = any;
  interface HTMLInputElement extends Object {}
}

export {};
