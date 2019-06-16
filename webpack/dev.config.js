const baseConfig = require('./base.config');

let createConfig = (env,argv) => {
  const _createConfig = baseConfig({
    /* put developmant params here */
  })
  const _config = _createConfig(env,argv)
  _config.watch = true; // make webpack watch for changes
  return _config;
}

module.exports = createConfig;
