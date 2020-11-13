const fs = require('fs');
const paths = require('./paths');
const useReactConfig = fs.existsSync(paths.reactConfig);

const getReactConfig = () => {
  let ReactConfig;
  if (useReactConfig) {
    ReactConfig = require(paths.reactConfig)
  }
  return ReactConfig
}
let reactConfig = getReactConfig()

/**获取入口文件总配
 * entry = {
    main: {
      path: [
        isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'),
        paths.appIndexJs,
      ].filter(Boolean),
      filename: 'index.html',
      template: paths.appHtml
    }
  }
 */
const getEntryConfig = (isEnvDevelopment) => {
  let entry = {}
  if (reactConfig) {
    let entryConfig = reactConfig.entry
    let keys = Object.keys(entryConfig)
    if (keys.length < 1) {
      console.error('entry 配置不正确，不能为空')
      return false
    } else {
      for (let i in entryConfig) {
        let e = entryConfig[i]
        let epath = e.path || e
        let href = paths.appHtml;
        if (epath.match(/[0-9a-zA-Z_\-]\.js$/)) {
          let htm = epath.replace(/[0-9a-zA-Z_\-]*\.js$/, 'index.html')
          if (fs.existsSync(htm)) {
            href = htm
          }
        } else {
          epath = epath + '/index.js'
          let htm = epath.replace(/[0-9a-zA-Z_\-]*\.js$/, 'index.html')
          if (fs.existsSync(htm)) {
            href = htm
          }
        }
        entry[i] = {
          path: [
            isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'),
            epath,
          ].filter(Boolean),
          filename: e.filename ? e.filename : (i === 'main' ? 'index.html' : (keys.length > 1 ? `${i}.html` : 'index.html')),
          template: href
        }
      }
    }
  } else {
    entry = {
      main: {
        path: [
          isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'),
          paths.appIndexJs,
        ].filter(Boolean),
        filename: 'index.html',
        template: paths.appHtml
      }
    }
  }
  return entry
}


const getResolve = () => {
  let resolve = {}
  if (reactConfig) {
    resolve = reactConfig.resolve || {}
  }
  return resolve
}
// 获取module
const getModule = () => {
  let rmodule = {}
  if(reactConfig) {
    rmodule = reactConfig.module || {}
  }
  return rmodule
}
// 获取插件
const getPlugins = () => {
  let plugins = []
  if (reactConfig && reactConfig.plugins) {
    plugins = reactConfig.plugins
  }
  return plugins
}
// 获取devServer 的 port
const getPort = () => {
  let port = 3000
  if(reactConfig) {
    port = reactConfig.devServer && reactConfig.devServer.port || 3000
  }
  return port
}

// 获取publicPath 可使用process.env.PUBLIC_URL 获取 package.json 配置 homepage字段
const getPublicPath = (isProduction = 'development') => {
  let publicPath = '/'
  if (reactConfig && isProduction === 'production' && reactConfig.publicPath) {
    publicPath = reactConfig.publicPath
  }
  return publicPath
}
// 获取生产环境是否开启 sourceMap
const getSourcemap = () => {
  let sourceMap = false
  if(reactConfig && reactConfig.sourceMap) {
    sourceMap = reactConfig.sourceMap !== 'false'
  }
  return sourceMap
}

// 是否使用babelrc babelConfig
const useBabelrc = () => (reactConfig.useBabelrc || false)
const useBabelConfig = ()=> (reactConfig.useBabelConfig || false)

module.exports = {
  getReactConfig,
  getEntryConfig,
  getResolve,
  getModule,
  getPlugins,
  getPort,
  getPublicPath,
  getSourcemap,
  useBabelrc,
  useBabelConfig
}