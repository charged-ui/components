// vite-env.d.ts
declare module '*.css?raw' {
  const content: string;
  export default content;
}
