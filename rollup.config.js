import typescript from 'rollup-plugin-typescript2';
import autoExternal from 'rollup-plugin-auto-external';
import resolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';

export default{
    input: 'src/main.ts',
    output: {
        dir: 'dist/',
        format: 'esm',
        entryFileNames: '[name].js',
		chunkFileNames: '[name].js',
    },
    plugins: [
        typescript({
            tsconfig: "tsconfig.json",
        }),
        autoExternal({}),
        resolve({
            jsnext:true,
            extensions: ['.ts','.js'],
            browser: true,
        }),
        globals(),
    ]
}