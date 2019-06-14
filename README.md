WARNONG: Don't return 500 & 500+ errors from api here. details http://dev.chromium.org/throttling

1. clone the extension and run it in development mode
```sh
git clone https://github.com/dkarmalita/chrome-extension-webpack.git
npm i
npm start
```
2. open <a href="chrome://extensions">chrome extensions page</a> (`chrome://extensions`) link in Google Chrome
3. toggle on the `Developer mode` switcher
4. press `Load unpacked` button and select `./dist` folder in the chooser

    Tip: click `background page` link on the extension's card to see its separate console