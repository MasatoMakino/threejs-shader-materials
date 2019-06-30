"use strict";

const { series } = require("gulp");

const doc = require("gulptask-tsdoc")();
exports.doc = doc;

const server = require("gulptask-dev-server")("./docs/demo");
exports.server = server;

const { bundleDevelopment, watchBundle } = require("gulptask-webpack")(
  "./webpack.config.js"
);
exports.bundleDevelopment = bundleDevelopment;

const { tsc, watchTsc } = require("gulptask-tsc")();

const watchTasks = cb => {
  watchBundle();
  watchTsc();
  cb();
};
exports.watchTasks = watchTasks;

exports.start_dev = series(watchTasks, server);

exports.build = series(tsc, bundleDevelopment, doc);
