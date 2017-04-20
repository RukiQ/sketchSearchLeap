/*
 * @Author: Ruth
 * @Date:   2017-03-10 15:02:22
 * @Last Modified by:   Ruth
 * @Last Modified time: 2017-03-11 12:07:11
 */

'use strict';

define(function(require, exports, module) {
    var $ = require('jquery'),
        ObjDisplayInit = require('./showObj').init,
        ObjDisplayLoad = require('./showObj').loadObj;

    var $retrResult = $('.retr-result');

    $.ajax({
        url: '/upload',
        type: 'GET',
        success: function(data) {
            render(data);
        }
    });

    function render(data) {
        for (var i = 0; i < data.length; i++) {
            var oImg = '<img src="' + data[i].imgPath +
                '" data-objpath="' + data[i].objPath +
                '" " class="box leap-interactive"/>';
            $retrResult.append(oImg);
        }
    }

    function bindEvent(eType) {
        $retrResult.on(eType, '.box', function(e) {
            var $target = $(e.target);

            switch (eType) {
                /*case 'mouseover':
                    $target.css({
                        'border': '2px solid #63cbdc'
                    });
                    break;

                case 'mouseout':
                    $target.css({
                        'border': 'none'
                    });
                    break;*/

                case 'click':
                    $target.siblings().css({
                        'border': 'none'
                    })
                    $target.css({
                        'border': '2px solid #63cbdc'
                    });

                    ObjDisplayLoad({
                        imgPath: e.target.src,
                        objPath: $target.data('objpath')
                    });
            }
        });
    }

    bindEvent('mouseover');
    bindEvent('mouseout');
    bindEvent('click');

    // 模型展示
    ObjDisplayInit();

    LeapManager.init({
        interactiveSelector: "a",
        maxCursors: 1
    });
});