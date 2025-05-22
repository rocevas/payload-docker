import fsExtra from 'fs-extra';
const { moveSync, existsSync, removeSync, ensureDirSync } = fsExtra;

const tmpDir = '.build-tmp';
const payloadBase = 'src/app/(payload)';
const frontendBase = 'src/app/(frontend)';

const payloadDirs = ['admin', 'api']
  .map(d => `${payloadBase}/${d}`);
const frontendDirs = ['next', 'search']
  .map(d => `${frontendBase}/${d}`);

const allDirs = [...payloadDirs, ...frontendDirs];

async function main() {
  const mode = process.argv[2];

  if (mode === 'prebuild') {
    // ––– prebuild: move all folders
    ensureDirSync(tmpDir);
    for (const src of allDirs) {
      if (existsSync(src)) {
        const name = src.split('/').slice(-1)[0];
        moveSync(src, `${tmpDir}/${name}`);
        console.log(`Moved ${src} → ${tmpDir}/${name}`);
      }
    }
    console.log('Prebuild operations complete: Files moved.');
  } else if (mode === 'postbuild') {
    // ––– postbuild: restore all folders
    for (const name of allDirs.map(p => p.split('/').slice(-1)[0])) {
      const from = `${tmpDir}/${name}`;
      const to = payloadDirs.some(p => p.endsWith(name))
        ? `${payloadBase}/${name}`
        : `${frontendBase}/${name}`;
      if (existsSync(from)) {
        ensureDirSync(to.split('/').slice(0, -1).join('/'));
        moveSync(from, to);
        console.log(`Restored ${from} → ${to}`);
      }
    }
    removeSync(tmpDir);
    console.log('Postbuild operations complete: Files restored and temporary directory removed.');
  } else {
    console.error('Invalid mode specified. Use "prebuild" or "postbuild".');
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
