// scripts/copy-license.js
const fs = require('fs');
const path = require('path');

module.exports = async function (context) {
  const licenseSrc = path.resolve(__dirname, '../LICENSE');
  const licenseDest = path.join(context.appOutDir, 'LICENSE');

  fs.copyFileSync(licenseSrc, licenseDest);
  console.log('📄 LICENSE copied to:', licenseDest);
};
