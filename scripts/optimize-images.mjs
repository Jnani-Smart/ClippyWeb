import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const assetsDir = path.resolve(process.cwd(), 'public/Assets');

async function ensureDir(dir) {
  try { await fs.mkdir(dir, { recursive: true }); } catch (_) {}
}

async function convertOne(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;
  const base = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  const input = sharp(filePath);

  const avifOut = path.join(dir, `${base}.avif`);
  const webpOut = path.join(dir, `${base}.webp`);

  await Promise.all([
    input.clone().avif({ quality: 55 }).toFile(avifOut),
    input.clone().webp({ quality: 70 }).toFile(webpOut),
  ]);
  console.log(`Optimized: ${base}{.avif,.webp}`);
}

async function main() {
  await ensureDir(assetsDir);
  const items = await fs.readdir(assetsDir);
  await Promise.all(items.map((name) => convertOne(path.join(assetsDir, name))));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});



