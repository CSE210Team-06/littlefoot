import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

const production = !process.env.ROLLUP_WATCH

const terserPlugin = terser({
  output: {
    comments: false,
  },
})

export default [
  {
    input: 'src/littlefoot.ts',
    plugins: [
      resolve({ mainFields: ['main'] }),
      commonjs(),
      typescript(),
      production && terserPlugin,
    ],
    context: 'window',
    output: {
      name: 'littlefoot',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
  },
  {
    input: 'src/littlefoot.ts',
    external: Object.keys(pkg.dependencies),
    plugins: [typescript(), production && terserPlugin],
    context: 'window',
    output: [
      {
        exports: 'named',
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    input: 'src/littlefoot.ts',
    external: Object.keys(pkg.dependencies),
    plugins: [typescript({ target: 'ES6' }), production && terserPlugin],
    context: 'window',
    output: [
      {
        exports: 'named',
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
  },
]
