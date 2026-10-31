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
import { githubRateLimitMiddleware } from '../middleware/rateLimit.js';

const router = express.Router();

router.get('/github-stats/:username', githubRateLimitMiddleware, async (req, res) => {
  const { username } = req.params;

  if (!isValidGitHubUsername(username)) {
    return res.status(400).json({ error: 'Invalid username' });
  }

  let cached = null;
  try {
    cached = await getGithubCacheEntry(username);
  } catch (cacheError) {
    console.warn('GitHub cache read failed:', cacheError.message);
  }

  try {
    const user = await githubJson(
      `https://api.github.com/users/${encodeURIComponent(username)}`
    );

    const repos = await fetchAllOwnerRepos(username);

    const payload = buildGitHubStatsPayload(user, repos);

    try {
      await setGithubCacheEntry(username, payload);
    } catch (cacheError) {
      console.warn('GitHub cache write failed:', cacheError.message);
    }

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
