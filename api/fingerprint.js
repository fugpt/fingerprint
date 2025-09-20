// api/fingerprint.js
const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../data/uadata.json');

function loadFingerprints() {
  try {
    return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  } catch {
    return [];
  }
}

module.exports = (req, res) => {
  const list = loadFingerprints();
  if (!list.length) return res.status(500).json({ error: '没有可用指纹' });
  const rnd = list[Math.floor(Math.random() * list.length)];
  res.json(rnd);
};