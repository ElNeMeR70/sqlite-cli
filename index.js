#!/usr/bin/env node
const fs = require("fs");
const dbPath = process.argv[2];
if (!dbPath || dbPath === "-h" || dbPath === "--help") {
  console.log("Usage: sqlite-cli <sqlite-file.db>");
  process.exit(dbPath ? 0 : 1);
}
try {
  const buf = fs.readFileSync(dbPath, { flag: "r" });
  const header = buf.subarray(0, 16).toString("utf8");
  if (!header.startsWith("SQLite format 3")) {
    console.error("\x1b[31mNot a valid SQLite 3 database file\x1b[0m");
    process.exit(1);
  }
  const pageSize = buf.readUInt16BE(16);
  const version = buf.readUInt32BE(96);
  console.log("\x1b[36m=== SQLite Database Inspector ===\x1b[0m");
  console.log(`File:       ${dbPath}`);
  console.log(`Page Size:  ${pageSize} bytes`);
  console.log(`Version:    ${version}`);
  console.log(`File Size:  ${(buf.length / 1024).toFixed(2)} KB`);
  console.log("\x1b[32m✔ Valid SQLite 3 Header\x1b[0m");
} catch (e) {
  console.error("Error: " + e.message);
  process.exit(1);
}
