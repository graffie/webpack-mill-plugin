/*
 * webpack-mill-plugin - MillPlugin.js
 * Copyright(c) 2016 xeodou <xeodou@gmail.com>
 * MIT Licensed
 */

'use strict';

var ConcatSource = require("webpack-sources").ConcatSource;

function MillPlugin(options) {
  if (arguments.length = 0) {
    throw new Error("Must provider theme name in argument.")
  }
  if (typeof options === "string") {
    options = {
      name: options
    };
  }
  this.options = options;
  this.options.prefix = options.prefix || "themes";
}

MillPlugin.prototype.apply = function (compiler) {
  var name = this.options.prefix + "/" + this.options.name;
  compiler.plugin("compilation", function (compilation) {

    compilation.mainTemplate.plugin("render", function (bootstrapSource, chunk, hash, moduleTemplate, dependencyTemplates) {
      var source = new ConcatSource();
      source.add("webpackJsonp(['" + name + "'],");
      var modules = compilation.mainTemplate.renderChunkModules(chunk, moduleTemplate, dependencyTemplates, "/******/ ");
      source.add(compilation.mainTemplate.applyPluginsWaterfall("modules", modules, chunk, hash, moduleTemplate, dependencyTemplates));
      source.add(")");
      return source;
    });

    compilation.plugin("optimize-module-ids", function (modules) {
      modules.forEach(function (module) {
        module.id = name + (module.index > 0 ? ("/" + module.index) : '');
      });
    });
  });
};

module.exports = MillPlugin;
