// api/fingerprint/all.js
const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../../data/uadata.json');

function loadFingerprints() {
  try {
    return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  } catch {
    return [];
  }
}

module.exports = (req, res) => {
  res.json(loadFingerprints());
};