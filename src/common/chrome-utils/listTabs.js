// https://stackoverflow.com/a/28432087
export default function (maskArray=['http://*/*', 'https://*/*']) {
  return new Promise(resolve => {
    chrome.tabs.query({ url: maskArray }, function(tabsArr){
      if(chrome.runtime.lastError) {
        resolve([])
      } else {
        resolve(tabsArr)
      }
    })
  })
}
