"use strict";
const { series, parallel } = require("gulp");

const doc = require("gulptask-tsdoc").get();
const server = require("gulptask-dev-server").get("./docs/demo");

const { bundleDemo, watchDemo } = require("gulptask-demo-page").get({
  body: `<canvas id="webgl-canvas" width="640" height="480"></canvas>`
});
const { tsc, tscClean, watchTsc } = require("gulptask-tsc").get();

const watchTasks = async () => {
  watchDemo();
  watchTsc();
};

exports.start_dev = series(watchTasks, server);
exports.build = series(tsc, parallel(bundleDemo, doc));
exports.build_clean = series(tscClean, parallel(bundleDemo, doc));
