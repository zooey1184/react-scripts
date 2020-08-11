# 对应 react-scripts 版本 3.3.1
>暂不支持react-scripts3.3.0以下的，如果使用create-react-app创建的项目里面react-scripts 版本是3.3.0可能导致版本冲突不能使用z-react-scripts 命令行


|  当前版本 | react-script 对应版本 |
|:---------:|:---------------------:|
| 1.1.1     |  3.3.1                |
| 1.4.4     |  3.4.1                |


```sh
# 使用方式同react-scripts

"scripts": {
  "start": "z-react-scripts start",
  "build": "z-react-scripts build",
  "test": "z-react-scripts test",
  "eject": "z-react-scripts eject"
}

```
#### 新建文件 react.config.js
> 默认支持less.   (scss支持需要安装node-sass)

目录结构
```sh
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── react.config.js
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
...

```

```js
// react.config.js

const path = require('path')
/**
 * react 个性化配置
 * 注意：不支持异步获取
 * 特别注意 除了 entry 必选配置, 其他都是可选配置
 */
const config = {
  /**
   * 部署应用包时的基本 URL 暂时只配置了生产环境
   * 默认配置 '/'
   * ps: 配置的另外几种方式 process.env.PUBLIC_URL package.json中homepage字段
   */
  publicPath: '/',

  /** 
   * entry: string | object 入口文件配置
   * 如果路径只是到文件夹，则配置自动寻找 index.html  index.js
   * string 文件入口
   * object {path, filename?} path=> 文件夹入口  filename => 最终访问形式
   * filename 默认index.html
   * 可配置多入口 
   * 特别注意如果配置的是多入口  请保证有一个是main的入口  否则不生效
   */
  entry: {
    main: path.join(__dirname, './src/index.js'),
    // a: path.join(__dirname, './src/pages/a/index.js'),
    // a1: {
    //   path: path.join(__dirname, './src/pages/a'),
    //   filename: 'index.html'
    // },
    // b: path.join(__dirname, './src/pages/b'),
  },

  /**
   * resolve:object webpack中resolve配置
   * learn more：https://www.webpackjs.com/configuration/resolve/
   * 暂时只提供alias别名设置
   */
  resolve: {
    /**
     * alias: object 别名设置
     */
    alias: {
      '@': path.join(__dirname, './src')
    }
  },

  /**
   * module: object webpack中module配置
   * learn more: https://www.webpackjs.com/concepts/modules/
   */
  module: {
    /**
     * rules: object[] loader规则配置
     * 默认支持less，sass以及module导入
     * sass需要node>12.0
     * 如果rules 是一个函数 能够让开发者更细粒度的操作rules  需要返回 <ruleLoaders>[]
     */
    rules: []
  },

  /**
   * sourceMap:string
   * 适用 production 环境
   * 是否默认开启sourceMap
   * 可选值："true" || "false"
   */
  sourceMap: 'false',

  /**
   * plugins: []
   * webpack plugins配置
   * 如果之前存在会覆盖原先的配置
   * 默认空数组
   */
  plugins: [],

  /**
   * devServer: object 本地服务配置
   * 暂时开放proxy && port
   */
  devServer: {
    /**
     * port：number || string
     * 端口设置
     * 默认值：3000
     */
    port: 3000,
    /** 
     * proxy: string
     * 同package.json 的proxy字段
     * 可以使用建立setupProxy.js的独立文件配置proxy
     * 需要使用中间件，参数为App 
     */
    // proxy: ''
  },

  /**
   * outputDir: string 打包导出目录
   * 默认 build 文件夹
   */
  outputDir: 'build',
  
  /* 可以使用.babelrc 配置 */
  // useBabelrc: true,

  /* 可以使用babel.config.js */
  // useBabelConfig: true,
}

module.exports = config
```


****
##### react-scripts 说明
This package includes scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app).<br>
Please refer to its documentation:

- [Getting Started](https://facebook.github.io/create-react-app/docs/getting-started) – How to create a new app.
- [User Guide](https://facebook.github.io/create-react-app/) – How to develop apps bootstrapped with Create React App.

修改原文件
path
webpack.config.js
+ dealConfig.js
