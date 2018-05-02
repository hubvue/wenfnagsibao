//js模拟毛笔写字

function Handwriting(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = "rgb(0,0,0)";
    var _this = this;
    this.canvas.onmousedown = function (e) { _this.downEvent(e) };
    this.canvas.onmousemove = function (e) { _this.moveEvent(e) };
    this.canvas.onmouseup = function (e) { _this.upEvent(e) };
    this.canvas.onmouseout = function (e) { _this.upEvent(e) };
    this.moveFlag = false;
    this.upof = {};
    this.radius = 0;
    this.has = [];
    this.lineMax = 30;
    this.lineMin = 3;
    this.linePressure = 1;
    this.smoothness = 80;
}

Handwriting.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Handwriting.prototype.downEvent = function (e) {
    this.moveFlag = true;
    this.has = [];
    this.upof = this.getXY(e);
}

Handwriting.prototype.moveEvent = function (e) {
    if (!this.moveFlag)
        return;
    var of = this.getXY(e);
    var up = this.upof;
    var ur = this.radius;
    this.has.unshift({ time: new Date().getTime(), dis: this.distance(up, of) });
    var dis = 0;
    var time = 0;
    for (var n = 0; n < this.has.length - 1; n++) {
        dis += this.has[n].dis;
        time += this.has[n].time - this.has[n + 1].time;
        if (dis > this.smoothness)
            break;
    }
    var or = Math.min(time / dis * this.linePressure + this.lineMin, this.lineMax) / 2;
    this.radius = or;
    this.upof = of;
    if (this.has.length <= 4)
        return;
    var len = Math.round(this.has[0].dis / 2) + 1;
    for (var i = 0; i < len; i++) {
        var x = up.x + (of.x - up.x) / len * i;
        var y = up.y + (of.y - up.y) / len * i;
        var r = ur + (or - ur) / len * i;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI, true);
        this.ctx.fill();
    }
}

Handwriting.prototype.upEvent = function (e) {
    this.moveFlag = false;
}

Handwriting.prototype.getXY = function (e) {
    return {
        x: e.clientX - this.canvas.offsetLeft + (document.body.scrollLeft || document.documentElement.scrollLeft),
        y: e.clientY - this.canvas.offsetTop + (document.body.scrollTop || document.documentElement.scrollTop)
    }
}

Handwriting.prototype.distance = function (a, b) {
    var x = b.x - a.x, y = b.y - a.y;
    return Math.sqrt(x * x + y * y);
}

var hw = new Handwriting("canvasId");
hw.lineMax = 40;
hw.lineMin = 5;
hw.linePressure = 2.5;
hw.smoothness = 100;  

//清除画布
function clear(hw){
    var inp = document.getElementById('inp');
    addEvent(inp,'click',function(){
        hw.clear.call(hw);
    });
}
clear(hw);

//搜索 + 图片轮播
    var searchLunbo = (function(){
        var searchInp = document.getElementById('searchInp');
        var btn = document.getElementById('btn');
        var imgBox = document.getElementById('fontLunboImg');
        var next = document.getElementById('next');
        var imgs = findChild(imgBox);
        var len = imgs.length ;
        searchInp.selectedIndex = -1;         
        function search(){
            addEvent(btn,'click',function(){
                var searchInpValue = searchInp.value;
                if (searchInpValue != ""){
                    next.style.display = 'block';
                    for (let i = 0; i < len; i++) {
                        if (i > (len - 2)) {
                            imgs[i].src = '../../image/tiyanLunbo/' + searchInpValue + 0 + '.jpg';
                        } else {
                            imgs[i].src = '../../image/tiyanLunbo/' + searchInpValue + i + '.jpg';
                        }
                    }   
                } 
            })
        }
        var temp,
            imgWidth = parseInt(getStyle(imgs[0],'width'));
        function lunbo(){
            addEvent(next,'click',function(){
                var temp = -(parseInt(getStyle(imgBox, 'left')));
                var timer = setInterval(function () {
                    temp = temp + 2;
                    imgBox.style.left = -temp + 'px';
                    if(parseInt(getStyle(imgBox,'left')) == -1200){
                        imgBox.style.left = '0px';
                    }
                    if (parseInt(getStyle(imgBox, 'left')) % imgWidth == 0) {
                        clearInterval(timer);
                    }
                }, 1)
            })
        }
          
        return function(){
            search();
            lunbo();
            
        }
    }());

    searchLunbo();



//封装兼容性事件处理函数
function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, function () {
            handle.call(elem);
        })
    } else {
        elem['on' + type] = handle;
    }
}

//封装查找子元素节点兼容性处理
function findChild(elem) {
    var arr = [];
    var childs = elem.childNodes;
    for (var prop in childs) {
        if (childs.hasOwnProperty(prop)) {
            if (childs[prop].nodeType == 1) {
                arr.push(childs[prop]);
            }
        }
    }
    return arr;
}

//封装查看样式兼容性处理
function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
} 
