const { execSync } = require('child_process');
const path = require('path');

function getVersion() {
  try {
    const tag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    return tag.startsWith('v') ? tag.slice(1) : tag;
  } catch {
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    return pkg.version || 'latest';
  }
}

const imageName = 'docker-version-control';
const version = getVersion();

console.log(`Building ${imageName}:${version}`);
execSync(`docker build -t ${imageName}:${version} -t ${imageName}:latest .`, {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..'),
});
console.log(`Done. Image: ${imageName}:${version} (and ${imageName}:latest)`);
