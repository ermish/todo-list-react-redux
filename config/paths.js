'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appBuild: resolveApp('build'),
  appCssGuide: resolveApp('src/cssguide.jsx'),
  appHtml: resolveApp('src/index.html'),
  appIndexJs: resolveApp('src/pages/index.js'),
  appPublic: resolveApp('public'),
  appRoot: resolveApp(''),
  appSrc: resolveApp('src'),
  configESLint: resolveApp('.eslintrc'),
  configPostCSS: resolveApp('config/postcss.config.js'),
  configStyleLint: resolveApp('.stylelintrc')
};
