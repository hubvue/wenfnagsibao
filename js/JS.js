// type(obj)      完整版输出类型
//deepAlone(Origin, Target)    深度克隆
//inherit(Target,Origin)    圣杯模式
//arr.unique()     数组去重  返回新的数组
//原型链编程 封装inserAfter（）；功能类似insertBefore
//getScrollOffset()    兼容性获取窗口尺寸
// getStyle(elem, prop)     兼容性查询计算样式
//addEvent(elem,type,handle) 兼容性 事件处理函数 
// stopBubble(e)  封装兼容性取消冒泡函数
//cancelHandler 封装兼容性阻止默认事件函数




// type(obj)      完整版输出类型
function type(obj) {
    var toStr = Object.prototype.toString;
    var arrStr = '[object Array]';
    var numStr = '[object Number]';
    var sStr = '[object Object]';
    if (obj === null) {
        return 'null'
    }
    else if (typeof (obj) == 'object') {
        switch (toStr.call(obj)) {
            case '[object Array]': return 'object-Array';
            case '[object Number]': return 'object-Number';
            case '[object Object]': return 'object-Object';
        }
    }
    else {
        return typeof (obj);
    }
}

//deepAlone(Origin, Target)   // 深度克隆
function deepAlone(Origin, Target) {
    var Target = Target || {};
    var toStr = Object.prototype.toString;
    var arrStr = '[object Array]';
    for (var prop in Origin) {
        if (Origin.hasOwnProperty(prop)) {
            if (Origin[prop] !== 'null' && typeof (Origin[prop]) == 'object') {
                Target[prop] = toStr.call(Origin[prop]) == arrStr ? [] : {};   //三目运算符  并且有返回值
                deepAlone(Origin[prop], Target[prop]);
            }
            else {
                Target[prop] = Origin[prop];
            }
        }
    }
    return Target;
}

//inherit(Target,Origin)    //圣杯模式
var inherit = (function () {
    var F = function () { };//私有化
    return function (Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constrcutor = Target;
        Target.prototype.uber = Origin.prototype;
    };
}());

//arr.unique()     数组去重  返回新的数组
Array.prototype.unique = function () {
    var temp = {}, arr = [], len = this.length;
    for (var i = 0; i < len; i++) {
        if (!temp[this[i]]) {
            temp[this[i]] = "a";
            arr.push(this[i]);
        }
    }
    return arr;
}
//封装inserAfter（）；功能类似insertBefore
Element.prototype.insertAfter = function (n, node) {
    if (this.lastElementChild == node) {
        this.appendChild(n);
    }
    else {
        this.insertBefore(n, node.nextElementSibling);
    }
}
//  获取窗口尺寸
function getScrollOffset() {
    if (window.pageYOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop,
        }
    }
}
//兼容性查询计算样式
function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}  
// 兼容性 事件处理函数 
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

//兼容性取消冒泡函数
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

//封装兼容性阻止默认事件函数
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else{
        event.returnValue = false;
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

var iframe = document.getElementById('iframe');
console.log(parseInt(getStyle(iframe,'width')));