import typescript from '@rollup/plugin-typescript'
// import json from '@rollup/plugin-json'
// import { terser } from 'rollup-plugin-terser';

console.log('test')

export default {
  input: 'src/server/server.ts',
  output: { file: 'server.js',format: 'cjs' },
  plugins:
    [
      typescript(),
      // terser()
    ]
}