const https = require("https");
const fs = require("fs");
const path = require("path");

const siteId = "172c058a-779b-4394-97b4-14439328e9e0";

// Try multiple name variations
const names = [
  "innovativeplayschool-app",
  "innovative-playschool",
  "innovative-play-school",
  "innovativeplayschool-edu",
  "littleminds-innovativeplayschool",
];

const configPath = path.join(process.env.APPDATA, "netlify", "Config", "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const userId = config.userId;
const token = config.users[userId].auth.token;

async function tryRename(name) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({ name });
    const options = {
      hostname: "api.netlify.com",
      port: 443,
      path: `/api/v1/sites/${siteId}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Content-Length": Buffer.byteLength(postData),
      },
    };
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => { body += chunk; });
      res.on("end", () => {
        if (res.statusCode === 200) {
          const data = JSON.parse(body);
          resolve({ success: true, url: "https://" + data.subdomain + ".netlify.app" });
        } else {
          resolve({ success: false, name, error: body });
        }
      });
    });
    req.write(postData);
    req.end();
  });
}

(async () => {
  for (const name of names) {
    console.log(`Trying: ${name}...`);
    const result = await tryRename(name);
    if (result.success) {
      console.log(`✅ Success! New URL: ${result.url}`);
      return;
    } else {
      console.log(`  ❌ Taken`);
    }
  }
  console.log("All variations taken. Please choose a different name.");
})();
