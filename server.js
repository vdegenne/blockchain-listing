'use strict';

var Koa = require('koa');
var statics = require('koa-static');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Koa__default = /*#__PURE__*/_interopDefaultLegacy(Koa);
var statics__default = /*#__PURE__*/_interopDefaultLegacy(statics);

const port = 44059;
const app = new Koa__default['default'];
app.use(statics__default['default']('public'));
app.listen(port, () => console.log(`listening on http://localhost:${port}/`));
