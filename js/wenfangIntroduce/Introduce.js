//全局变量
var content = document.getElementById('timeline');

//鼠标点击事件
function enter(){
    var temps = vent(content);
    var len = temps.length;
    var brr = [];
    for(let i = 0; i < len; i++){
        brr[i] = true;
    }
    for(let i = 0; i < len; i ++){
        temps[i].onclick = function(){
            var next = temps[i].nextElementSibling;
            var temp = findChilds(next);
            var len = temp.length;
            for (let j = 0; j < len; j++) {
                if (temp[j].className.indexOf('p') != -1) {
                    if (brr[i]) {
                        var timer = setInterval(function () {
                            temp[j].style.height = parseInt(getStyle(temp[j], 'height')) + 2 + 'px';
                            if (parseInt(getStyle(temp[j], 'height')) == 100) {
                                clearInterval(timer);
                            }
                        }, 1);
                        brr[i] = false;
                    } else {
                        var timer1 = setInterval(function () {
                            temp[j].style.height = parseInt(getStyle(temp[j], 'height')) - 2 + 'px';
                            if (parseInt(getStyle(temp[j], 'height')) == 0) {
                                clearInterval(timer1);
                            }
                        }, 1);
                        brr[i] = true;
                    }
                }
            }
        }
    }
     
}
//全局函数执行
function init(){
    enter();
}
init();
//
function vent(content){
    var temps = content.getElementsByTagName('*');
    var array = [];
    var len = temps.length;
    for(let i = 0; i < len; i ++){
        if(temps[i].className.indexOf('k') != -1){
            array.push(temps[i]);
        }
    }
    return array;
}
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
//查找元素确定子节点class封装实现
function findChild(elem, type) {
    var childs = elem.childNodes;
    for (var prop in childs) {
        if (childs.hasOwnProperty(prop)) {
            console.log(childs[prop],type);
            if (childs[prop].className.indexOf(type) != -1) {
                return childs[prop];
            }
        }
    }
}


//封装查找子元素节点兼容性处理
function findChilds(elem) {
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