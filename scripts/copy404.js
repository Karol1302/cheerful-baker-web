import { copyFile } from "fs/promises";
import { resolve } from "path";

async function main() {
  const src = resolve("dist/index.html");
  const dest = resolve("dist/404.html");
  try {
    await copyFile(src, dest);
    console.log(`Copied ${src} to ${dest}`);
  } catch (err) {
    console.error("Failed to copy index.html to 404.html", err);
    process.exit(1);
  }
}

main();