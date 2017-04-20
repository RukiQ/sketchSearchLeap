/*
 * @Author: Ruth
 * @Date:   2017-01-03 10:57:35
 * @Last Modified by:   Ruth
 * @Last Modified time: 2017-03-10 16:49:30
 */

'use strict';

// The build will inline common dependencies into this file.

// For any third party dependencies, like jQuery, 
// except 'app' ones, 
requirejs.config({
    'baseUrl': '../',

    // 定义模块加载路径
    'paths': {
        'jquery': 'js/lib/jquery-3.1.1'
    },

    // shim 属性，专门用来配置不兼容的模块
    'shim': {}
});

// Load the main app module to start the app
requirejs(['js/app/showResult']);