const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");

const dataFile = path.join(__dirname, "data", "uadata.json");
const sourceUrl = "https://raw.githubusercontent.com/你的用户名/你的仓库/main/uadata.json";

async function updateFingerprints() {
  try {
    const res = await fetch(sourceUrl);
    const json = await res.json();
    fs.writeFileSync(dataFile, JSON.stringify(json, null, 2));
    console.log("✅ 指纹库已更新:", new Date().toISOString());
  } catch (err) {
    console.error("❌ 更新失败，保留旧数据:", err);
  }
}

updateFingerprints();
setInterval(updateFingerprints, 30 * 24 * 60 * 60 * 1000);
