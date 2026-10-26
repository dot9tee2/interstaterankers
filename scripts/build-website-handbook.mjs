import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { spawnSync } from 'node:child_process';

// Keep the on-page commands, answers and PDF in sync.
const source = fs.readFileSync('src/data/website-handbook.ts', 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const data = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
fs.mkdirSync('tmp/pdfs', { recursive: true });
fs.writeFileSync('tmp/pdfs/website-handbook-data.json', JSON.stringify(data));
const python = process.env.HANDBOOK_PYTHON || 'python';
const result = spawnSync(python, ['scripts/build_website_handbook.py'], { stdio: 'inherit' });
if (result.status !== 0) process.exit(result.status ?? 1);
fs.mkdirSync('public/downloads', { recursive: true });
fs.copyFileSync(path.join('output/pdf', 'website-launch-handbook.pdf'), 'public/downloads/website-launch-handbook.pdf');
console.log('Built handbook and copied it to the website download URL.');
