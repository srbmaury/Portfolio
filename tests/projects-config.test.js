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
  assert.equal(project.githubUrl, 'https://github.com/srbmaury/EvalcueAI');
  assert.ok(project.highlights.length >= 3);
  assert.ok(project.systemFlow.length >= 4);
});

test('keeps Chess ML Coach in the archive at its current live URL', () => {
  const project = projectsByTitle.get('Chess ML Coach');
  assert.ok(project);
  assert.equal(project.featured, false);
  assert.equal(project.liveUrl, 'https://chess.srbmaury.com/');
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
  assert.equal(payload.repos.find(repo => repo.name === 'RecallLater').stars, 1);
});

test('features four projects and lists Jobbot with its public source in the archive', () => {
  assert.deepEqual(projectsData.projects.filter(project => project.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder).map(project => project.title), [
    'PR Blast Radius', 'FreeEdit', 'Evalcue AI', 'Ecommerce Search Engine',
  ]);
  assert.equal(projectsByTitle.get('YAML Data Visualizer').featured, false);
  const jobbot = projectsByTitle.get('Jobbot');
  assert.equal(jobbot.featured, false);
  assert.equal(jobbot.githubUrl, 'https://github.com/srbmaury/target-company-sde-scanner');
});
