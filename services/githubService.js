import dotenv from 'dotenv';

dotenv.config();

function isValidGitHubUsername(username) {
  return (
    typeof username === 'string' &&
    /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username)
  );
}

function githubRequestHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'portfolio-server',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function githubJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, {
      headers: githubRequestHeaders(),
      signal: controller.signal,
    });

    const text = await res.text();
    const body = text ? JSON.parse(text) : null;

    if (!res.ok) {
      const err = new Error(body?.message || 'GitHub request failed');
      err.status = res.status;
      throw err;
    }

    return body;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchAllOwnerRepos(username) {
  const all = [];
  let page = 1;

  for (;;) {
    const url = `https://api.github.com/users/${encodeURIComponent(
      username
    )}/repos?per_page=100&page=${page}&type=owner`;

    const batch = await githubJson(url);

    if (!Array.isArray(batch) || batch.length === 0) break;

    all.push(...batch);

    if (batch.length < 100) break;
    if (++page > 50) break;
  }

  return all;
}

function buildGitHubStatsPayload(user, repos) {
  const totalStars = repos.reduce(
    (sum, r) => sum + (r.stargazers_count || 0),
    0
  );

  const featuredRepositoryNames = [
    'India-Startup-Map',
    'kindred-code',
    'NEET',
  ];

  const repositoriesByName = new Map(repos.map((repo) => [repo.name.toLowerCase(), repo]));
  const featuredRepos = featuredRepositoryNames
    .map((name) => repositoriesByName.get(name.toLowerCase()))
    .filter(Boolean);

  const selectedRepos = featuredRepos.length > 0
    ? featuredRepos
    : [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);

  const topRepos = selectedRepos
    .map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      html_url: r.html_url,
      stars: r.stargazers_count,
      stargazers_count: r.stargazers_count,
      forks: r.forks_count,
      forks_count: r.forks_count,
      language: r.language,
      updated_at: r.updated_at,
      topics: r.topics || [],
    }));

  return {
    user: {
      login: user.login,
      name: user.name,
      bio: user.bio,
      avatar_url: user.avatar_url,
      public_repos: user.public_repos,
      public_gists: user.public_gists,
      followers: user.followers,
      following: user.following,
      location: user.location,
      company: user.company,
      blog: user.blog,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
    repos: topRepos,
    stats: {
      totalStars,
      totalRepos: user.public_repos ?? repos.length,
    },
  };
}

export {
  isValidGitHubUsername,
  githubJson,
  fetchAllOwnerRepos,
  buildGitHubStatsPayload,
};
