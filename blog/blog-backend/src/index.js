// no-global-assign ESLint 옵션 비활성화하기
/* eslint-disable no-global-assign */

require = require('esm')(module /*, options*/);
module.exports = require('./main.js');