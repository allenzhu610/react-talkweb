# react-talkweb开发文档

------

## 主要技术参考

> * [react~16.4.1][1]
> * [react-router^4.3.1(HashRouter兼容IE9)][2]
> * [font-awesome^4.7.0][3]
> * [antd^3.6.4][4]
> * [less^3.0.4][5]
> * [es6(polyfill兼容到IE9)][6]
> * [koa^2.5.1(nodejs服务)][7]

------

## 项目说明
企业多系统管理平台前端框架，采用antd作为组件库（可靠稳定），在平台里面添加系统方便，合理抽分系统之间的公共部分；考虑到框架适配业务多为查询管理页面，没有引入redux，尽可能的简化框架层次结构。框架兼容到IE9，使用es6语法。  

支持less与css样式文件，每个页面less文件做了模块化，公共less和css文件没有做模块化  

框架集成node服务，提供测试接口及静态资源服务，可用于测试或完善成正式服务

**具体开发详情看代码注释**

------

## 开发环境搭建

 1. 编译器  
    编译器推荐使用sublime，本文档将围绕sublime来进行说明  
    下载地址：[Sublime Text 3][7]，选择对应平台下载安装  
 2. 编译器插件  
    [LESS-sublime][8](高亮显示less文件)  
    [babel-sublime][9](高亮显示react的jsx语法)  
    [sublime-jsfmt][10](格式化react代码，此插件需要**手动安装依赖**)  
      设置文件
      ```json
      {
        "autoformat": true,
        "extensions": [
          "js",
          "jsx",
          "sublime-settings"
        ],
        "options": {
          "jsx": {
            "alignWithFirstAttribute": false,
            "attrsOnSameLineAsTag": false,
            "firstAttributeOnSameLine": false,
            "formatJSX": true
          },
          "plugins": [
            "esformatter-jsx"
          ]
        }
      }
      ```
    [Sublime-HTMLPrettify][11](格式化js，css，html，无法格式化jsx语法)  
    安装教程及快捷键配置在它们对应的github主页有详细说明  
    推荐使用**下载文件**，解压到**Packages**目录安装  
 3. 调试工具chrome插件  
    建议使用chrome进行调试  
    可翻墙去chrome扩展程序商店安装React Developer Tools  
    也可下载[React Developer Tools][12]离线安装，安装教程自行百度  
 4. nodejs安装  
    下载地址：[nodejs][13]，选择对应平台下载安装，默认选项安装无需配置环境变量  
 5. npm配置  
    nodejs内置了npm，无需手动安装，了解npm请参考：[npm 中文文档][14]  
    cnpm为淘宝npm镜像，可大大提高npm安装依赖的速度  
    cnpm临时使用：`npm --registry https://registry.npm.taobao.org install express`  
    cnpm持久使用：`npm config set registry https://registry.npm.taobao.org`  

------

## 项目目录结构说明

![目录结构][15]

------

## 项目npm指令说明

### 安装依赖
```
cd react-talkweb
npm install
```
### 开发环境启动
```
cd react-talkweb
npm run dev 或者 npm run start
访问 http://localhost:3000/
测试用户：admin
密码：test@123
```
### 编译生产代码
```
cd react-talkweb
npm run build
编译后代码位于build目录
```
### 启动测试node服务
```
cd react-talkweb
npm install -g nodemon
npm run server
访问 http://localhost:8881/index.html
测试用户：admin
密码：test@123
```

  [1]: http://react.yubolun.com/
  [2]: http://react-guide.github.io/react-router-cn/docs/API.html
  [3]: http://fontawesome.dashgame.com/
  [4]: https://ant.design/docs/react/introduce-cn
  [5]: http://lesscss.cn/
  [6]: http://es6.ruanyifeng.com/
  [7]: https://www.sublimetext.com/
  [8]: https://github.com/danro/LESS-sublime
  [9]: https://github.com/babel/babel-sublime
  [10]: https://github.com/ionutvmi/sublime-jsfmt
  [11]: https://github.com/victorporof/Sublime-HTMLPrettify
  [12]: http://chromecj.com/downloadstart.html#890
  [13]: https://nodejs.org/zh-cn/download/
  [14]: https://www.npmjs.com.cn/
  [15]: ./目录结构.png