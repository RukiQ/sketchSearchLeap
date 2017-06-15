# sketchSearchLeap

基于 Leap Motion 的三维模型草图检索原型应用

A Prototype System of Sketch-Based 3D Model Retrieval Based on Leap Motion

> 说明：本应用除了 Leap Motion 交互部分的代码不同，其余与 sketchSearchMobi 中的部分代码相同。

### 采用的技术

-  `Node.js` 构建服务器
-   `requirejs` 进行模块化开发
-   `jQuery` 进行DOM操作
-   `HTML5 Canvas` 实现画布功能
-   `Three.js` 实现模型展示

### 环境配置

- `Node.js`：[官网](https://nodejs.org/zh-cn/)
- SDK（opencv、boost）：[下载地址](http://pan.baidu.com/s/1slwbV1V)，密码 w5d2

	把 SDK 放到目录 `E:\sketchsearch-dll\SDK` 下（任何目录均可），然后配置一下环境变量，即创建一个新的环境变量`SKETCHSEARCH_SDK`，将目录路径作为值添加：

	![配置SDK环境变量](https://github.com/RukiQ/sketchSearchLeap/blob/master/public/img/%E9%85%8D%E7%BD%AESDK%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.png?raw=true)
	

- 安装 node-gyp 及 Phton 环境：[Node调用C++（dll）](http://www.cnblogs.com/Ruth92/p/6209953.html)、[Python官网](https://www.python.org/)

		npm install node-gyp -g
    
    > 注意： 根据 node-gyp 的GitHub显示，请务必保证你的 python 版本介于 2.5.0 和 3.0.0 之间。

- 安装 Leap Motion SD：[官网下载地址](https://developer.leapmotion.com/windows-vr)

### 目录结构

- /bin
	- www --------------------------------- 配置监听端口号，目前端口号为：3000
- /include -------------------------------- 特征提取算法所需的相关库文件，链接库需要
- /public
	- /css -------------------------------- css样式文件
	- /img -------------------------------- 图片文件（[img百度云链接](http://pan.baidu.com/s/1geJPBEV)）
	- /js
		- /app
			- draw.js --------------------- 草图绘画
			- showResult.js --------------- 模型检索
			- showObj.js ------------------ 模型展示
		- /lib
		- app.js
	- /supply
		- 102_shrec2012png ---------------- 线画图 **（[从百度云上下载]）**
		- models -------------------------- obj 格式模型（[模型下载链接](http://pan.baidu.com/s/1mhCTNVq)）
		- params.json ---------------------- 参数配置
- /router
	- index.js ---------------------------- 页面路由，读取txt文件中的路径，并返回
	- result.txt
- /views
	- error.ejs
	- index.ejs --------------------------- 页面视图
- app.js
- package.json ----------------------------- 所需的依赖包配置文件
- params.json ------------------------------ 检索算法（链接库）所需参数，已改为相对路径，在静态资源/supply中
- query.js ---------------------------------
- upload.js -------------------------------- 必须放在和 query.js 及链接库等同目录下，用于调用链接库实现检索功能
- imagesearcherdll.dll
- imagesercherdll.lib

> 注意：静态资源中 `/img` 和 `/supply` 中的图片和模型数据需从[百度云盘]上进行下载后放置到对应目录中。

### 启动服务

#### `npm install`

安装相关包

#### `npm start`

在浏览器输入：`localhost:3000/draw`，并连接上Leap Motion，则可使用该应用。

#### 问题解决

`npm install` 时遇到的问题：

	if not defined npm_config_node_gyp

请参考 [Node调用C++（dll）](http://www.cnblogs.com/Ruth92/p/6209953.html)，需要配置
