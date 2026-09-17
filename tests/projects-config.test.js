import assert from 'node:assert/strict';
import test from 'node:test';

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
