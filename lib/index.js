import arrify from 'arrify';
import detectors from './detectors';

export default (commits) => {
  const { COMMIT_CONVENTION_OVERRIDE } = process.env;

  if (detectors[COMMIT_CONVENTION_OVERRIDE]) {
    return COMMIT_CONVENTION_OVERRIDE;
  }

  commits = arrify(commits);

  let tally = {};

  commits.forEach((commit) => {
    let header = commit.split('\n')[0];

    for (let convention in detectors) {
      if (detectors[convention](header)) {
        let count = tally[convention];
        count = count ? ++count : 1;
        tally[convention] = count;
      }
    }
  });

  let max = 0;
  let ret = 'unknown';

  for (let prop in tally) {
    let val = tally[prop];
    if (val > max) {
      max = val;
      ret = prop;
    } else if (val === max) {
      // cheat
      if (prop === 'ember' || prop === 'jquery') {
        ret = 'jquery';
      }
    }
  }

  return ret;
};
