import { hash, compare } from 'bcryptjs';

export function hashText(unHashText) {
  return hash(unHashText, 10).then(function (hash) {
    return hash;
  });
}

export function compareHash(unHashText, hashText) {
  return compare(unHashText, hashText).then((result) => {
    return result;
  });
}
