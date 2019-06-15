const fs = require('fs');
const { RawSource, ConcatSource, OriginalSource } = require("webpack-sources");

const dynamicRequire = path => eval(fs.readFileSync(path, 'utf8'))

module.exports = class ManifestPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('ManifestPlugin', (compilation, cb) => {

      const { config } = this.options

      const createManifest = dynamicRequire(config) // load source ccode

      const manifest = createManifest({
        context: compilation.compiler.context,
        mode: compilation.options.mode,
        options: this.options.options,
        watchMode: compilation.compiler.watchMode,
      })

      compilation.assets['manifest.json'] = new RawSource(JSON.stringify(manifest, null, 2));
      compilation.fileDependencies.add(config) // add manifest source to the watching list

      cb();
    });
  }
};

// outputPath, options, options.mode, context (project's folder), watchMode
// https://webpack.js.org/contribute/plugin-patterns/
// https://webpack.js.org/api/node/#invalidate-watching
// https://github.com/webpack/webpack/issues/4175#issuecomment-418325916
