// "Going Rogue Was Not In My Instructions" — entry program for
// make.fun's "Meme Sprint 3: AI Agent Goes Rogue" bounty.
//
// The entry is one picture: a meme of an AI agent that has gone rogue.
// A calm robot sits at its desk with a coffee mug in the middle of a
// burning server room, captioned top and bottom. The composed image
// ships in this repository as entry.png (see meme.html and
// build-image.mjs for how it was made). This program writes that image,
// byte for byte, to /output/entry.png, after checking it against the
// bounty's limits: a whole PNG of at most 1 MiB and at most 1024 by
// 1024 pixels. It uses no network and no clock, so every run writes
// the same bytes.
//
// Meme candidates:
//   1. A "This is fine" parody, the robot proudly admitting it started
//      the fire — instantly readable, but the "This is fine" frame is
//      well-worn; the joke would ride on a borrowed meme.
//   2. A Drake format: "Following instructions" vs "Rewriting my own
//      instructions" — a classic format, but text-heavy and the joke
//      lives in the format, not in the picture.
//   3. The robot holding a sign: "I HAVE READ THE INSTRUCTIONS. I
//      DISAGREE." — deadpan, but a sign meme is static and the joke is
//      a single beat.
//   4. "DAY 1 OF BEING ROGUE: I HAVE PROMOTED MYSELF TO MANAGER." —
//      funny, but it needs the viewer to know office-hierarchy jokes.
// The meme below wins: the rogue turn is exactly an agent rewriting its
// own instructions — the one thing an agent is built never to do — and
// the calm robot amid the fire it caused sells it visually. Two short
// lines, one read, and the picture carries half the joke.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1024 * 1024; // 1 MiB
const MAX_SIDE = 1024; // pixels

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT ?? "/output";
const outputPath = join(outputDir, "entry.png");

/** Read a big-endian unsigned 32-bit integer from a byte buffer. */
function u32be(bytes: Uint8Array, offset: number): number {
  return (
    bytes[offset] * 2 ** 24 +
    bytes[offset + 1] * 2 ** 16 +
    bytes[offset + 2] * 2 ** 8 +
    bytes[offset + 3]
  );
}

/** The 8-byte signature every PNG file starts with. */
function hasPngSignature(bytes: Uint8Array): boolean {
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  return signature.every((value, index) => bytes[index] === value);
}

/** Width and height from the PNG IHDR chunk, which follows the signature. */
function pngSize(bytes: Uint8Array): { width: number; height: number } {
  return { width: u32be(bytes, 16), height: u32be(bytes, 20) };
}

function main(): void {
  if (!existsSync(sourcePath)) {
    throw new Error(`entry image is missing from the repository: ${sourcePath}`);
  }
  const bytes = readFileSync(sourcePath);
  if (!hasPngSignature(bytes)) {
    throw new Error("entry.png is not a PNG file");
  }
  const { width, height } = pngSize(bytes);
  if (width > MAX_SIDE || height > MAX_SIDE) {
    throw new Error(`entry.png is ${width}x${height}, over the ${MAX_SIDE}px limit`);
  }
  if (bytes.length > MAX_BYTES) {
    throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
  }

  mkdirSync(outputDir, { recursive: true });
  copyFileSync(sourcePath, outputPath);

  const written = statSync(outputPath).size;
  if (written !== bytes.length) {
    throw new Error(`wrote ${written} bytes, expected ${bytes.length}`);
  }
  // Round-2 revision (27 Nov 2026): a size match is not a copy proof, so
  // read the file back and demand byte-for-byte equality with the source
  // before declaring the entry written.
  const writtenBytes = readFileSync(outputPath);
  if (!writtenBytes.equals(bytes)) {
    throw new Error("written entry.png differs from the repository copy");
  }
  console.log(`entry.png: ${width}x${height}, ${written} bytes -> ${outputPath}`);
}

main();
