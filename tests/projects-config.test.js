import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync } from 'node:fs';
import selectedRepositories from '../src/config/githubRepositories.json' with { type: 'json' };
import { buildGitHubStatsPayload } from '../services/githubService.js';

import projectsData from '../src/config/projects.json' with { type: 'json' };

const projectsByTitle = new Map(
  projectsData.projects.map((project) => [project.title, project]),
);

test('features Evalcue AI instead of the legacy Companion AI card', () => {
  assert.equal(projectsByTitle.has('Companion AI'), false);

  const project = projectsByTitle.get('Evalcue AI');
  assert.ok(project);
  assert.equal(project.featured, true);
  assert.equal(project.liveUrl, 'https://evalcueai.com/');
  assert.equal(project.githubUrl, undefined);
  assert.ok(project.highlights.length >= 3);
  assert.ok(project.systemFlow.length >= 4);
});

test('features Chess ML Coach with its product and repository links', () => {
  const project = projectsByTitle.get('Chess ML Coach');
  assert.ok(project);
  assert.equal(project.featured, true);
  assert.equal(project.liveUrl, 'https://chess-ml-coach.onrender.com/');
  assert.equal(project.githubUrl, 'https://github.com/srbmaury/Chess-Coach');
  assert.ok(project.highlights.length >= 3);
  assert.ok(project.systemFlow.length >= 4);
});

test('every configured project screenshot exists and the impact report uses its sample capture', () => {
  for (const { title, image } of projectsData.projects) {
    if (image) assert.ok(existsSync(new URL(`../public${image}`, import.meta.url)), title);
  }
  const blastRadius = projectsByTitle.get('PR Blast Radius');
  assert.equal(blastRadius.image, '/images/projects/pr-blast-radius-sample.webp');
  assert.match(blastRadius.imageCaption, /test fixture/);
  assert.equal(projectsByTitle.get('ExitSense').imageFit, 'contain');
});

test('GitHub statistics enrich the same repositories shown on the homepage', () => {
  const repoFixture = [
    ...selectedRepositories.map((repo, index) => ({
      ...repo, stargazers_count: index + 1, forks_count: index,
    })),
    { name: 'Repo-LLD-generator', stargazers_count: 10 },
  ];
  const payload = buildGitHubStatsPayload({}, repoFixture);
  assert.deepEqual(payload.repos.map(repo => repo.name), selectedRepositories.map(repo => repo.name));
  assert.equal(payload.repos.find(repo => repo.name === 'pr-blast-radius').stars, 1);
});
