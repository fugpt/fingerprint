const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  const dataFile = path.join(__dirname, "../data/uadata.json");

  function loadFingerprints() {
    try {
      const raw = fs.readFileSync(dataFile, "utf-8");
      return JSON.parse(raw);
    } catch (err) {
      console.error("❌ 加载指纹失败:", err);
      return [];
    }
  }

  const fingerprints = loadFingerprints();

  if (req.query.type === "all") {
    res.status(200).json(fingerprints);
  } else {
    if (fingerprints.length === 0) {
      return res.status(500).json({ error: "没有可用指纹" });
    }
    const randomFp = fingerprints[Math.floor(Math.random() * fingerprints.length)];
    res.status(200).json(randomFp);
  }
};
