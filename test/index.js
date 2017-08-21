import assert from 'assert';
import conventionalCommitsDetector from '../lib';

let equal = assert.strictEqual;

it('should be angular', function () {
  let commits = [
    'test(matchers): add support for toHaveClass in tests',
    'refactor(WebWorker): Unify WebWorker naming\n\nCloses #3205',
    'feat: upgrade ts2dart to 0.7.1',
    'feat: export a proper promise type'
  ];

  equal(conventionalCommitsDetector(commits), 'angular');
});

it('should be atom', function () {
  let commits = [
    ':memo: Fix license',
    ':memo: Add a screenshot',
    ':fire: init',
    'Prepare 0.0.1 release'
  ];

  equal(conventionalCommitsDetector(commits), 'atom');
});

it('should be ember', function () {
  let commits = [
    '[BUGFIX beta] Guard `meta` and move readonly error to prototype.',
    '[DOC beta] Add docs for get helper'
  ];

  equal(conventionalCommitsDetector(commits), 'ember');
});

it('should be eslint', function () {
  let commits = [
    'Core: Don\'t expose jQuery.access',
    'Tests: don\'t use deprecated argument in test declaration',
    'Update: Added as-needed option to arrow-parens (fixes #3277)'
  ];

  equal(conventionalCommitsDetector(commits), 'eslint');
});

it('should be jquery', function () {
  let commits = [
    'Core: Don\'t expose jQuery.access',
    'Tests: don\'t use deprecated argument in test declaration',
    'Docs: Fix various spelling mistakes'
  ];

  equal(conventionalCommitsDetector(commits), 'jquery');
});

it('should be jshint', function () {
  let commits = [
    '[[FEAT]] Add Window constructor to browser vars',
    '[[FEAT]] Add pending to Jasmine\'s globals',
    'Docs: Fix various spelling mistakes'
  ];

  equal(conventionalCommitsDetector(commits), 'jshint');
});

it('should accept an environment override', function () {
  // intentionally NOT angular
  let commits = [
    ':memo: Fix license',
    ':memo: Add a screenshot',
    ':fire: init',
    'Prepare 0.0.1 release'
  ];

  const oldEnv = process.env.COMMIT_CONVENTION_OVERRIDE;
  process.env.COMMIT_CONVENTION_OVERRIDE = 'angular';

  equal(conventionalCommitsDetector(commits), 'angular');
  process.env.COMMIT_CONVENTION_OVERRIDE = oldEnv;
});


it('should ignore an unknown environment override', function () {
  // intentionally NOT angular
  let commits = [
    ':memo: Fix license',
    ':memo: Add a screenshot',
    ':fire: init',
    'Prepare 0.0.1 release'
  ];

  const oldEnv = process.env.COMMIT_CONVENTION_OVERRIDE;
  process.env.COMMIT_CONVENTION_OVERRIDE = 'some unknown convention';

  equal(conventionalCommitsDetector(commits), 'atom');
  process.env.COMMIT_CONVENTION_OVERRIDE = oldEnv;
});
