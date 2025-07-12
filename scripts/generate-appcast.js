// scripts/generate-appcast.js
import fs from 'fs';
import https from 'https';

const owner = 'Jnani-Smart';
const repo = 'Clippy';

https.get(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
  headers: { 'User-Agent': 'ClippyAppcastScript' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const release = JSON.parse(data);
    const asset = release.assets.find(a => a.name.endsWith('.zip') || a.name.endsWith('.dmg'));
    if (!asset) {
      console.error('No .zip or .dmg asset found in latest release.');
      process.exit(1);
    }
    const pubDate = new Date(release.published_at).toUTCString();
    const version = release.tag_name.replace(/[^\d]/g, '') || '1';
    const shortVersion = release.tag_name.replace(/^v/, '');
    const xml = `<?xml version="1.0" encoding="utf-8"?>\n<rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle">\n  <channel>\n    <title>Clippy Updates</title>\n    <link>https://github.com/${owner}/${repo}/releases</link>\n    <description>Latest releases of Clippy</description>\n    <item>\n      <title>Version ${shortVersion}</title>\n      <description>${release.body || 'Latest stable release.'}</description>\n      <pubDate>${pubDate}</pubDate>\n      <enclosure\n        url="${asset.browser_download_url}"\n        sparkle:version="${version}"\n        sparkle:shortVersionString="${shortVersion}"\n        length="${asset.size}"\n        type="application/octet-stream"/>\n    </item>\n  </channel>\n</rss>\n`;
    fs.writeFileSync('./ClippyWeb/public/appcast.xml', xml);
    console.log('appcast.xml generated successfully!');
  });
}).on('error', err => {
  console.error('Error fetching release:', err);
}); 