const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Build configuration: single bundle entry that exposes globals for legacy HTML
const entry = path.resolve(__dirname, 'src', 'index.ts');
const outFile = path.resolve(__dirname, 'dist', 'bundle.js');
const outDir = path.dirname(outFile);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

console.log(`Bundling ${entry} -> ${outFile}`);
esbuild.build({
  entryPoints: [entry],
  bundle: true,
  minify: process.env.NODE_ENV === 'production',
  sourcemap: true,
  target: ['es2019'],
  platform: 'browser',
  format: 'iife',
  globalName: 'SyriaSyria',
  outfile: outFile,
  loader: { '.png': 'file', '.webp': 'file', '.svg': 'file' },
  define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') }
}).then(() => console.log('esbuild finished bundling bundle.js')).catch(err => {
  console.error('esbuild failed:', err);
  process.exit(1);
});
