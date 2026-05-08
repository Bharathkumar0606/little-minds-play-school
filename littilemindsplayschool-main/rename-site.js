const { execSync } = require("child_process");

const data = JSON.stringify({
  site_id: "172c058a-779b-4394-97b4-14439328e9e0",
  body: { name: "innovativeplayschool" }
});

try {
  const result = execSync(`npx netlify-cli api updateSite --data ${JSON.stringify(data)}`, {
    cwd: __dirname,
    encoding: "utf-8",
    stdio: "pipe"
  });
  console.log("✅ Site renamed successfully!");
  console.log(result);
} catch (err) {
  console.error("Error:", err.stderr || err.message);
}
