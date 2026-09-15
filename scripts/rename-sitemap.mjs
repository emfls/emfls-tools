import { access, rename } from 'node:fs/promises';

const source = 'dist/sitemap-index.xml';
const target = 'dist/sitemap.xml';

try {
  await access(source);
  await rename(source, target);
  await access(target);
} catch (error) {
  console.error(`Failed to rename ${source} to ${target}.`, error);
  process.exitCode = 1;
}
