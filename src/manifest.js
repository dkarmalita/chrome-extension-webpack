const path = require('path')

const requirePackageJson = (params) => require(path.join(params.context, 'package.json'))

function createManifest(params){

  const { mode } = params
  const pkg = requirePackageJson(params)
  const { name, version, description, author } = pkg
  const hrs = params.mode === 'development' ? ['hot-reload.js'] : []

  return{
    manifest_version: 2, name, version, description, author, short_name: name,

    // 'name': 'Super Power Your Browser',
    // 'short_name': 'SP Browser',
    // 'version': '1.0',
    // 'description': 'Bring Marvel\'s Super Heroes to your page thanks to the Marvel API.',
    // 'author': 'Dmitriy Karmalita',

    'key': 'kcbkpnaijopamohahimgbkdocedinoib',

    'background': {
      'scripts': [
        'background.js',
        ...hrs,
      ],
      'persistent': false
    },

    'browser_action': {
      'default_icon': {
        '19': 'assets/marvel_19.png',
        '38': 'assets/marvel_38.png'
      },
      'default_title': 'Power my Page!',
      'default_popup': 'popup.html'
    },

    'content_scripts': [
      {
        'matches': ['*://*/*'],
        'js': ['content_scripts.js']
      }
    ],

    // 'devtools_page': 'devtools.html',

    'content_security_policy': 'script-src \'self\' \'unsafe-eval\'; object-src \'self\'',

    'permissions': [
      'tabs',
      'http://*/*',
      'https://*/*',
      'http://gateway.marvel.com/'
    ]
  }
}

module.exports = createManifest