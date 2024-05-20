/* eslint-disable no-param-reassign */
import path from 'node:path';
import fs from 'node:fs';

function noDotFiles(x) {
  return x[0] !== '.';
}

export function readDir(root, filter, files, prefix) {
  prefix = prefix || '';
  files = files || [];
  filter = filter || noDotFiles;

  const dir = path.join(root, prefix);
  if (!fs.existsSync(dir)) return files;
  if (fs.statSync(dir).isDirectory())
    fs.readdirSync(dir)
      .filter((name, index) => filter(name, index, dir))
      .forEach((name) => {
        readDir(root, filter, files, path.join(prefix, name));
      });
  else files.push(prefix);

  return files;
}
