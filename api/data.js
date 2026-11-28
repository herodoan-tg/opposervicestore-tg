import fs from 'fs';
import path from 'path';

let memoryCache = null;

function readDefaultFile() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'dashboard.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-upload-pin');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  const ghToken = process.env.GITHUB_TOKEN;
  const ghRepo = process.env.GITHUB_REPO; // e.g. "username/repo-name"
  const ghBranch = process.env.GITHUB_BRANCH || 'main';
  const uploadPin = process.env.UPLOAD_PIN || '';

  // GET: Fetch latest shared data for everyone opening the link
  if (req.method === 'GET') {
    try {
      // 1. Try Upstash / Vercel KV first (instant real-time)
      if (kvUrl && kvToken) {
        const kvRes = await fetch(`${kvUrl}/get/oppo_store_dashboard_latest`, {
          headers: { Authorization: `Bearer ${kvToken}` }
        });
        if (kvRes.ok) {
          const kvJson = await kvRes.json();
          if (kvJson && kvJson.result) {
            const parsed = typeof kvJson.result === 'string' ? JSON.parse(kvJson.result) : kvJson.result;
            return res.status(200).json({ source: 'kv_realtime', data: parsed });
          }
        }
      }

      // 2. Try GitHub raw/API file if configured (always reflects latest GitHub commit without waiting for redeploy)
      if (ghToken && ghRepo) {
        const ghRes = await fetch(`https://api.github.com/repos/${ghRepo}/contents/data/dashboard.json?ref=${ghBranch}`, {
          headers: {
            Authorization: `Bearer ${ghToken}`,
            Accept: 'application/vnd.github.v3.raw'
          }
        });
        if (ghRes.ok) {
          const parsed = await ghRes.json();
          return res.status(200).json({ source: 'github_realtime', data: parsed });
        }
      }

      // 3. Memory cache (warm serverless container)
      if (memoryCache) {
        return res.status(200).json({ source: 'memory_warm', data: memoryCache });
      }

      // 4. Default bundled data/dashboard.json
      const fallback = readDefaultFile();
      return res.status(200).json({ source: 'repo_default', data: fallback });
    } catch (error) {
      const fallback = readDefaultFile();
      return res.status(200).json({ source: 'repo_fallback', data: fallback, warning: error.message });
    }
  }

  // POST: Save newly uploaded dataset so every visitor sees it in real time
  if (req.method === 'POST') {
    try {
      if (uploadPin) {
        const clientPin = req.headers['x-upload-pin'] || '';
        if (clientPin !== uploadPin) {
          return res.status(401).json({ error: 'Mã PIN tải lên không chính xác.' });
        }
      }

      const payload = req.body;
      if (!payload || !payload.metadata) {
        return res.status(400).json({ error: 'Dữ liệu JSON không hợp lệ.' });
      }

      payload.metadata.last_updated = new Date().toISOString();
      memoryCache = payload;
      const savedTargets = ['memory'];

      // Save to KV if available
      if (kvUrl && kvToken) {
        const setRes = await fetch(`${kvUrl}/set/oppo_store_dashboard_latest`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${kvToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        if (setRes.ok) savedTargets.push('kv_realtime');
      }

      // Commit directly to GitHub repository if GITHUB_TOKEN & GITHUB_REPO are configured
      if (ghToken && ghRepo) {
        const fileApiUrl = `https://api.github.com/repos/${ghRepo}/contents/data/dashboard.json`;
        let currentSha = undefined;
        const getMeta = await fetch(`${fileApiUrl}?ref=${ghBranch}`, {
          headers: { Authorization: `Bearer ${ghToken}`, Accept: 'application/vnd.github.v3+json' }
        });
        if (getMeta.ok) {
          const metaJson = await getMeta.json();
          currentSha = metaJson.sha;
        }

        const contentBase64 = Buffer.from(JSON.stringify(payload, null, 2), 'utf-8').toString('base64');
        const putRes = await fetch(fileApiUrl, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${ghToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `chore(data): update dashboard data (${payload.metadata.source_filename || 'web-upload'})`,
            content: contentBase64,
            sha: currentSha,
            branch: ghBranch
          })
        });
        if (putRes.ok) savedTargets.push('github_committed');
      }

      return res.status(200).json({
        success: true,
        savedTargets,
        persistent: savedTargets.includes('kv_realtime') || savedTargets.includes('github_committed'),
        data: payload
      });
    } catch (error) {
      return res.status(500).json({ error: 'Lỗi lưu dữ liệu: ' + error.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
