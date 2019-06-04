// ref: https://stackoverflow.com/a/12057014
export default function addWindowListener(cb){
  if (window.addEventListener) { // W3C standard
    window.addEventListener('load', cb, false); // NB **not** 'onload'
  }
  else if (window.attachEvent) { // Microsoft
    window.attachEvent('onload', cb);
  }
}
