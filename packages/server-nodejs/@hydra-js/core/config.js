const path = require('node:path');
const dotenv = require('dotenv');

const config = dotenv.config();
if (config.error) throw config.error;

const { parsed: envs } = config;

const __rootdir = path.join(__dirname, '..', '..');
const __publicdir = path.join(__rootdir, 'public');
const __templatedir = path.join(__rootdir, 'views');
const __layoutdir = path.join(__templatedir, '_layouts');
const __indexlayout = path.join(__layoutdir, 'index.html');
const __apidir = path.join(__rootdir, 'api');

export default {
  ...envs,
  __rootdir,
  __publicdir,
  __templatedir,
  __layoutdir,
  __indexlayout,
  __apidir,
};
