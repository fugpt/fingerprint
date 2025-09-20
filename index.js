const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const dataFile = path.join(__dirname, "data", "uadata.json");

function loadFingerprints() {
  try {
    const raw = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("❌ 加载指纹失败:", err);
    return [];
  }
}

app.get("/fingerprint/all", (req, res) => {
  const fingerprints = loadFingerprints();
  res.json(fingerprints);
});

app.get("/fingerprint/random", (req, res) => {
  const fingerprints = loadFingerprints();
  if (fingerprints.length === 0) {
    return res.status(500).json({ error: "没有可用指纹" });
  }
  const randomFp = fingerprints[Math.floor(Math.random() * fingerprints.length)];
  res.json(randomFp);
});

app.listen(PORT, () => {
  console.log(`🚀 Fingerprint API 服务运行中：http://localhost:${PORT}`);
});
