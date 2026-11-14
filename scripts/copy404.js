import { copyFile, rm } from "fs/promises";
import { resolve } from "path";

async function main() {
  const src = resolve("dist/index.html");
  const dest = resolve("dist/404.html");
  try {
    await copyFile(src, dest);
    console.log(`Copied ${src} to ${dest}`);
    // Zdjęcia i arkusz w tym katalogu są materiałami roboczymi, a nie ofertą.
    await rm(resolve("dist/new_products"), { recursive: true, force: true });
  } catch (err) {
    console.error("Failed to copy index.html to 404.html", err);
    process.exit(1);
  }
}

main();
