declare module '*.woff';
declare module '*.woff2';
declare module '*.ttf' {
  const value: import('expo-font').FontSource;
  export default value;
}
