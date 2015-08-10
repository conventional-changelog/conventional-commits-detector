import regex from './regex';
import { isUpperCase, isLowerCase } from './util';

export default {
  angular: (commit) => {
    let parts = commit.match(regex.angular);

    if (!parts) {
      return false;
    }

    if (isLowerCase(parts[0][0])) {
      return true;
    }
  },
  ember: (commit) => {
    return commit.match(regex.ember);
  },
  eslint: (commit) => {
    let parts = commit.match(regex.eslint);

    if (!parts) {
      return false;
    }

    if (isUpperCase(parts[0][0])) {
      return true;
    }
  },
  jquery: (commit) => {
    let parts = commit.match(regex.jquery);

    if (!parts) {
      return false;
    }

    if (isUpperCase(parts[0][0])) {
      return true;
    }
  },
  jshint: (commit) => {
    return commit.match(regex.jshint);
  }
};
