
// No types available so declaring empty modules
declare module 'netlify';
declare module 'netlify-cli/src/utils/deploy/deploy-site.js';

// Not sure why I need to override @types/got definitions
// But build isn't finding GotEmitter or GotOptions
declare module 'got' {
  export interface GotEmitter {}
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  export interface GotOptions<E extends string | null> {}
}
