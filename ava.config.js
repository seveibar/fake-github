export default {
  files: ["tests/**/*.test.ts"],
  extensions: ["ts"],
  require: ["esbuild-register"],
  watchMode: {
    ignoreChanges: [".edgespec"]
  }
}
