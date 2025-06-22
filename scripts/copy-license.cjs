// scripts/copy-license.cjs
const fs = require('fs');
const path = require('path');

module.exports = async function (context) {
  const licensePath = path.resolve(__dirname, '../LICENSE');

  if (!fs.existsSync(licensePath)) {
    console.warn('⚠️ LICENSE file not found at', licensePath);
    return;
  }

  // Copy to each artifact output
  for (const artifact of context.artifactPaths || []) {
    const dir = path.dirname(artifact);
    const dest = path.join(dir, 'LICENSE');
    fs.copyFileSync(licensePath, dest);
    console.log('✅ LICENSE copied to', dest);
  }
};
