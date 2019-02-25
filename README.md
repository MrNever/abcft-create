# abcft-create

abc前端脚手架

最新版本 `1.0.17`

基于各种原因，create-abcft-app这个脚手架将被create-abc-app替代。

目前create-abc-app 试用版已经发布在了内网npm中

首先将npm源切换到 http://47.97.39.200:4873/，然后执行命令`npm i -g create-abc-app`

`create-abc-app PROJECT_NAME` 创建一个项目脚手架

`create-abc-app -p COMPONENT_NAME` 创建一个组件脚手架

`create-abc-app -s COMPONENT_NAME` 创建一个服务端渲染脚手架

### 备注

组件脚手架基于rollup打包，默认仅支持styled-component，如果不习惯请使用`create-abcft-app`替代

ssr基于nextjs，生产要求nodejs@8.0及以上