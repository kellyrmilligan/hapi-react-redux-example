import 'scss/main.scss'

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept()
  require('scss/main.scss')
  const cssNode = document.getElementById('css-bundle')
  cssNode.href = cssNode.href.replace(/(\?\d+)?$/, `?${Date.now()}`)
}
