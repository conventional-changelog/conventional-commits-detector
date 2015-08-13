#!/usr/bin/env node
import conventionalCommitsDetector from '../lib';
import gitRawCommits from 'git-raw-commits';
import meow from 'meow';
import pkg from '../../package.json';
import through from 'through2-concurrent';

let cli = meow({
  help: [
    'Usage',
    '  $ conventional-commits-detector [<number of samples>]',
    '',
    'Examples',
    '  $ conventional-commits-detector',
    '  $ conventional-commits-detector 10'
  ],
  pkg: pkg
});

let input = cli.input[0];
let sampleCount;
let commits = [];

if (input) {
  sampleCount = parseInt(input, 10);
}

gitRawCommits({
  from: sampleCount ? 'HEAD~' + sampleCount : null
})
  .on('error', (err) => {
    console.error(err.message);
    process.exit(1);
  })
  .pipe(through((data, enc, cb) => {
    commits.push(data.toString());
    cb();
  }, () => {
    let convention = conventionalCommitsDetector(commits);
    console.log(convention);
  }));
