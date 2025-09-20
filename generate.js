const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "data", "uadata.json");

// 随机 hash
function randomHash(len = 12) {
  return [...Array(len)].map(() => Math.random().toString(36)[2]).join("");
}

// 随机选择
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 浏览器版本（最新或次新）
const chromeVersions = [139, 140, 141];
const firefoxVersions = [142, 143];
const safariVersions = ["17.6", "18.0", "18.6"];
const edgeVersions = [139, 140];

// 指纹模板池
const templates = [
  // Windows + Chrome
  () => ({
    platform: "Win32",
    screen: pick(["1920x1080", "2560x1440", "3440x1440"]),
    memory: pick(["8GB", "16GB", "32GB"]),
    cpu: pick(["4", "8", "12"]),
    ua: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${pick(chromeVersions)}.0.7339.185 Safari/537.36`
  }),
  // Windows + Firefox
  () => ({
    platform: "Win32",
    screen: pick(["1920x1080", "1600x900"]),
    memory: pick(["8GB", "16GB"]),
    cpu: pick(["4", "8"]),
    ua: `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:${pick(firefoxVersions)}) Gecko/20100101 Firefox/${pick(firefoxVersions)}`
  }),
  // macOS + Safari
  () => ({
    platform: "MacIntel",
    screen: pick(["2560x1600", "2880x1800", "3024x1964"]),
    memory: pick(["8GB", "16GB"]),
    cpu: pick(["8", "10"]),
    ua: `Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${pick(safariVersions)} Safari/605.1.15`
  }),
  // macOS + Chrome
  () => ({
    platform: "MacIntel",
    screen: pick(["2560x1600", "3456x2234"]),
    memory: pick(["16GB", "32GB"]),
    cpu: pick(["8", "12"]),
    ua: `Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${pick(chromeVersions)}.0.7339.185 Safari/537.36`
  }),
  // Linux + Chrome
  () => ({
    platform: "Linux x86_64",
    screen: pick(["1920x1080", "2560x1440"]),
    memory: pick(["8GB", "16GB"]),
    cpu: pick(["4", "8"]),
    ua: `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${pick(chromeVersions)}.0.7339.185 Safari/537.36`
  }),
  // Android
  () => ({
    platform: "Android",
    screen: pick(["1080x2400", "1440x3200", "1228x2700"]),
    memory: pick(["6GB", "8GB", "12GB"]),
    cpu: pick(["6", "8"]),
    ua: `Mozilla/5.0 (Linux; Android 14; ${pick(["SM-S918B", "Pixel 8 Pro", "JAD-AL50"])}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${pick(chromeVersions)}.0.7339.185 Mobile Safari/537.36`
  }),
  // iPhone
  () => ({
    platform: "iPhone",
    screen: pick(["1170x2532", "1290x2796", "1284x2778"]),
    memory: pick(["6GB", "8GB"]),
    cpu: "6",
    ua: `Mozilla/5.0 (iPhone; CPU iPhone OS ${pick(["17_6", "18_0"])} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${pick(safariVersions)} Mobile/15E148 Safari/605.1.15`
  })
];

// 生成一个完整指纹
function generateFingerprint() {
  const base = pick(templates)();
  return {
    canvas: randomHash(),
    webgl: randomHash(),
    ...base
  };
}

// 生成 30 个指纹
const fingerprints = Array.from({ length: 30 }, generateFingerprint);

// 写入 JSON
fs.writeFileSync(dataFile, JSON.stringify(fingerprints, null, 2), "utf-8");

console.log("✅ 已生成新的指纹库:", dataFile);
