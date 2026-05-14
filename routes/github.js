import express from 'express';
import {
  isValidGitHubUsername,
  githubJson,
  fetchAllOwnerRepos,
  buildGitHubStatsPayload,
} from '../services/githubService.js';

import {
  getGithubCacheEntry,
  setGithubCacheEntry,
} from '../services/cacheService.js';

const router = express.Router();

router.get('/github-stats/:username', async (req, res) => {
  const { username } = req.params;

  if (!isValidGitHubUsername(username)) {
    return res.status(400).json({ error: 'Invalid username' });
  }

  const cached = await getGithubCacheEntry(username);

  try {
    const user = await githubJson(
      `https://api.github.com/users/${encodeURIComponent(username)}`
    );

    const repos = await fetchAllOwnerRepos(username);

    const payload = buildGitHubStatsPayload(user, repos);

    await setGithubCacheEntry(username, payload);

    res.json({ ...payload, cached: false });
  } catch (err) {
    if (cached) {
      return res.json({ ...cached, cached: true, stale: true });
    }

    res.status(500).json({
      error: 'Failed to load GitHub data',
      details: err.message,
    });
  }
});

export default router;