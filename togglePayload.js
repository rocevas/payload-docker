import fsExtra from 'fs-extra';
const { moveSync, existsSync, removeSync, ensureDirSync } = fsExtra;

const tmpDir = '.build-tmp';
const payloadBase = 'src/app/(payload)';
const frontendBase = 'src/app/(frontend)';

const payloadDirs = ['admin','api']
  .map(d => `${payloadBase}/${d}`);
const frontendDirs = ['next','search']
  .map(d => `${frontendBase}/${d}`);

const allDirs = [...payloadDirs, ...frontendDirs];

async function main() {
  if (!existsSync(tmpDir)) {
    // ––– prebuild: move all folders
    ensureDirSync(tmpDir);
    for (const src of allDirs) {
      if (existsSync(src)) {
        const name = src.split('/').slice(-1)[0];
        moveSync(src, `${tmpDir}/${name}`);
        console.log(`Moved ${src} → ${tmpDir}/${name}`);
      }
    }
  } else {
    // ––– postbuild: restore all folders
    for (const name of allDirs.map(p => p.split('/').slice(-1)[0])) {
      const from = `${tmpDir}/${name}`;
      const to = payloadDirs.some(p=>p.endsWith(name))
        ? `${payloadBase}/${name}`
        : `${frontendBase}/${name}`;
      if (existsSync(from)) {
        ensureDirSync(to.split('/').slice(0,-1).join('/'));
        moveSync(from, to);
        console.log(`Restored ${from} → ${to}`);
      }
    }
    removeSync(tmpDir);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
