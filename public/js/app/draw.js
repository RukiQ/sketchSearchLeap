// Get the canvas and a 2-dimensional drawing context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.setAttribute('width', 850);
canvas.setAttribute('height', 650);

// Get the canvas width and height
var width = canvas.width,
    height = canvas.height;

// Create an array to save rect properties
var rects = [];

// get objects of finger status and numbers
var fingerPos = document.getElementById('fingerPos'),
    fingerPosTxt = fingerPos.childNodes[1],

    fingerNum = document.getElementById('fingerNum'),
    fingerNumTxt = fingerNum.childNodes[1];

// to control only download once
var flag = 1;

// Create a Leap controller to access frame data
var controller = new Leap.Controller();

controller.on('frame', function(frame) {

    // Clear the canvas so we can repaint
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    /*var baseImg = document.getElementById('base-img');
    ctx.drawImage(baseImg, 0, 0, width, height);*/

    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    onPaint();

    // 指向物识别
    var len = frame.pointables.length; // 指向物数量
    fingerNumTxt.innerHTML = len;

    if (len > 0) {

        var pointable = frame.pointables[0],
            position = pointable.stabilizedTipPosition,
            normalized = frame.interactionBox.normalizePoint(position),

            x = width * normalized[0],
            y = height * (1 - normalized[1]),

            begin = [x, y],
            color,
            fill;

        // 如果指向物只有1个，并且状态是touching，则绘图
        if (len === 1 && pointable.touchZone == 'touching') {
            color = "red";
            fill = true;

            // Save the rect properties to redraw it later
            var rect = {
                begin: [x, y]
            };
            rects.push(rect);

            fingerPosTxt.innerHTML = "touching";
            fingerPosTxt.style.color = fingerNumTxt.style.color = color;

        } else { // 否则只进行跟踪
            color = "rgba( 212, 255, 80, 1 )";
            fill = false;

            ctx.beginPath();
            ctx.fillStyle = "rgba( 100, 100, 100, 0.5 )";
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fill();

            rects.push({
                begin: []
            });

            fingerPosTxt.innerHTML = "hovering";
            fingerPosTxt.style.color = fingerNumTxt.style.color = color;
        }

        // Finally, draw the rect
        drawRect(begin, color, fill);

    } else {
        fingerPosTxt.innerHTML = "无指向物";
        // fingerPosTxt.style.color = "black";
    }

    // 手势识别
    frame.gestures.forEach(function(gesture) {

        if (gesture.direction) {
            var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
        }

        var swipeDirection;

        if (isHorizontal) {
            swipeDirection = gesture.direction[0] > 0 ? 'right' : 'left';
        } else {
            swipeDirection = 'down';
        }

        if (frame.valid && frame.gestures.length > 0) {
            /*color = "white";
            fill = false;

            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fill();*/

            drawRect(begin, color, fill);

            if (gesture.type == "swipe" && len !== 1) {
                switch (swipeDirection) {
                    // case 'left':
                    case 'right': // 如果向右挥动，则进入检索界面

                        if (flag) { // 保证只挥动一次便可检索
                            flag = 0;
                            searchModel();
                        }

                        break;
                    case 'down': // 如果向下挥动，则清空画布重新绘制
                        ctx.clearRect(0, 0, width, height);
                        rects = [];
                        break;
                }
            }
        }
    });
});

controller.setBackground(true);

// Connect the controller to start receiving data
controller.connect();

function searchModel() {
    var imgData = canvas.toDataURL('image/png');

    $('.loading').show();

    $.ajax({
        url: '/upload',
        type: 'POST',
        data: {
            imgData: imgData
        },
        success: function(data) {
            $('.loading').hide();
            window.location = 'http://localhost:3000/search';
        }
    });
}

// Draw a rectangle with the given parameters:
// begin: float array [x, y]
// color: string "#RGB"
// fill: boolean
function drawRect(begin, color, fill) {
    // Make an closed rect with a complete rotation
    ctx.beginPath();
    ctx.rect(begin[0], begin[1], 5, 4);
    ctx.closePath();
    //ctx.lineWidth = 2;

    // Choose whether to fill or outline the rect
    if (fill) {
        ctx.fillStyle = color;
        ctx.fill();
    } else {
        ctx.fillStyle = color;
        ctx.fill();
    }
}

// Redraw accumulated circles
function onPaint() { // 两点之间连线绘制
    for (var i = 0; i < rects.length - 1; i++) {
        // Retrieve the circle properties
        if (rects[i] !== [] && rects[i + 1] !== []) { // 如果是hover，则断开重画
            var begin = rects[i].begin;
            var end = rects[i + 1].begin;
            // Redraw the circle filled in black
            ctx.beginPath();
            ctx.moveTo(begin[0], begin[1]);
            ctx.lineTo(end[0], end[1]);
            ctx.stroke();
        } else {
            continue;
        }
        //drawRect(begin, "black", true);
    }
}