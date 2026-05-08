const { execSync } = require('child_process');

// Use netlify-cli's api command with proper JSON
const data = JSON.stringify({
  site_id: "172c058a-779b-4394-97b4-14439328e9e0",
  body: { name: "inovativeplayschool" }
});

try {
  const result = execSync(`npx -y netlify-cli api updateSite --data ${data}`, {
    encoding: 'utf-8',
    stdio: 'pipe'
  });
  console.log('Success:', result);
} catch (e) {
  console.log('CLI approach failed, trying direct API...');
  
  // Get the auth token from netlify config
  const os = require('os');
  const fs = require('fs');
  const path = require('path');
  
  let token = '';
  const configPath = path.join(os.homedir(), '.netlify', 'config.json');
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    token = config.users && Object.values(config.users)[0] && Object.values(config.users)[0].auth && Object.values(config.users)[0].auth.token;
  }
  
  if (!token) {
    console.log('\nCould not find Netlify auth token.');
    console.log('Please rename manually:');
    console.log('1. Go to https://app.netlify.com/projects/radiant-cajeta-6ee43c/settings');
    console.log('2. Click "Change site name"');
    console.log('3. Enter: inovativeplayschool');
    console.log('4. Your new URL will be: https://inovativeplayschool.netlify.app');
    process.exit(0);
  }

  const https = require('https');
  const postData = JSON.stringify({ name: 'inovativeplayschool' });
  
  const req = https.request({
    hostname: 'api.netlify.com',
    path: '/api/v1/sites/172c058a-779b-4394-97b4-14439328e9e0',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Length': Buffer.byteLength(postData)
    }
  }, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      const data = JSON.parse(body);
      if (data.name) {
        console.log(`✅ Site renamed to: ${data.name}`);
        console.log(`🌐 New URL: https://${data.name}.netlify.app`);
      } else {
        console.log('Response:', body);
      }
    });
  });
  
  req.write(postData);
  req.end();
}
