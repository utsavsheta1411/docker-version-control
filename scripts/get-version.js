const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function getVersion() {
  try {
    const tag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    return tag.startsWith('v') ? tag.slice(1) : tag;
  } catch {
    const pkgPath = path.join(__dirname, '..', 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    return pkg.version || 'latest';
  }
}

console.log(getVersion());
