import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdir, mkdtemp, open, readFile, rename, rm, rmdir, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const setsDir = join(publicDir, 'sets');
const outputDir = join(setsDir, 'thumbnails');
const manifestFile = new URL('../src/config/offerThumbnails.json', import.meta.url);
const previewWidths = [400, 800];

const { sets } = JSON.parse(await readFile(join(setsDir, 'sets.json'), 'utf8'));
const previews = new Map();

await mkdir(outputDir, { recursive: true });
const workingDir = await mkdtemp(join(outputDir, '.generate-'));
const workingImage = join(workingDir, 'preview.webp');
const logFile = join(workingDir, 'ffmpeg.log');

async function encodeThumbnail(source, targetWidth) {
  const log = await open(logFile, 'w');
  let exitCode;
  try {
    const ffmpeg = spawn('ffmpeg', [
      '-hide_banner', '-nostdin', '-y', '-i', source,
      '-map', '0:v:0', '-frames:v', '1',
      '-vf', `scale=w='min(${targetWidth},iw)':h=-1:flags=lanczos,showinfo=checksum=0`,
      '-c:v', 'libwebp', '-quality', '86', '-compression_level', '5',
      '-f', 'webp', workingImage,
    ], { stdio: ['inherit', 'inherit', log.fd] });
    [exitCode] = await once(ffmpeg, 'exit');
  } finally {
    await log.close();
  }

  const output = await readFile(logFile, 'utf8');
  if (exitCode !== 0) {
    throw new Error(`FFmpeg failed for ${source}:\n${output.trim()}`);
  }

  // The encoded width can be lower than the target when the input is small.
  const width = Number(output.match(/\bs:(\d+)x\d+\b/)?.[1]);
  if (!width) throw new Error(`FFmpeg produced no usable thumbnail for ${source}`);
  return width;
}

try {
  for (const { id, thumbnail } of sets) {
    if (previews.has(thumbnail)) continue;

    const source = resolve(publicDir, `.${thumbnail}`);
    if (!/^[a-z0-9_-]+$/i.test(id) || !thumbnail.startsWith('/sets/') || relative(setsDir, source).startsWith('..')) {
      throw new Error(`Invalid thumbnail for product ${id}: ${thumbnail}`);
    }

    const variants = [];
    for (const targetWidth of previewWidths) {
      const width = await encodeThumbnail(source, targetWidth);
      if (variants.some((variant) => variant.width === width)) continue;

      const filename = `${id}-${width}.webp`;
      await rename(workingImage, join(outputDir, filename));
      variants.push({ url: `/sets/thumbnails/${filename}`, width });
    }
    previews.set(thumbnail, variants);
  }

  await writeFile(manifestFile, `${JSON.stringify(Object.fromEntries(previews), null, 2)}\n`);
  console.log(`Generated responsive thumbnails for ${previews.size} product photos.`);
} finally {
  await rm(workingImage, { force: true });
  await rm(logFile, { force: true });
  await rmdir(workingDir);
}
