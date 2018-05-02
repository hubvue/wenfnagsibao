//图片瀑布流效果
imgFill('wrapper');
var src = document.getElementById('img').src;
var srcNUL = src.slice(0,src.length - 6);
var reg = /(\/[A-z]+){3}$/g;
var srcString = srcNUL.match(reg).join("");
console.log(srcString);
window.onload = function(){
    addElement();   
}
function addElement(){
    window.onscroll = function(){
        if (scrollTop()){
            var wrapper = document.getElementById('wrapper');
            var box = document.createElement('div');
            box.className = 'box';
            var boxImg = document.createElement('div');
            boxImg.className = 'box-img';
            var img = document.createElement('img');
            var num = Math.floor(Math.random() * 13);
            img.src = "../.." + srcString + '/' + num + '.jpg';
            wrapper.appendChild(box);
            box.appendChild(boxImg);
            boxImg.appendChild(img);
        }
        imgFill('wrapper');
    }
}
function scrollTop(){
    var scrollT = getScrollOffset().y;
    var width = getClientOffset().h;
    var wrapper = document.getElementById('wrapper');
    var oBoxs = findChild(wrapper);
    var oBoxTop = oBoxs[oBoxs.length - 1].offsetTop;
    var oBoxWidth = oBoxs[oBoxs.length - 1].offsetWidth / 2;
    if (width + scrollT > oBoxTop + oBoxWidth) {
        return true;
    } else{
        return false;
    }
}
function imgFill(wrapper){
    //获取wrapper区域
    var wrapper = document.getElementById('wrapper');  
    //获取盒子
    var oBox = findChild(wrapper);  
    //设置wrapper区域的宽度
    var oWidth = document.documentElement.clientWidth || document.body.clientWidth;

    var oBoxWidth = oBox[0].offsetWidth;

    var num = Math.floor(oWidth / oBoxWidth) ;

    wrapper.style.width = num * oBoxWidth + 'px';
    var arr = [];
    for(var i = 0 ;i < oBox.length ; i ++){
        if(i < num){
            arr.push(oBox[i].offsetHeight);   
        } else {
            var min = Math.min.apply(null,arr);
            var index = isArray(arr, min);

            oBox[i].style.position = "absolute";
            oBox[i].style.top = min + 'px' ;
            oBox[i].style.left = index * oBoxWidth + 'px';
            arr[index] += oBox[i].offsetHeight;
        }
    }
}



var bindEvent = (function(){
    var wrapper = document.getElementById('wrapper');
    var layer = document.getElementById('layer');
    var img = findChild(layer)[0];
    var btn = findChild(layer)[1];  
    var ceng = document.getElementById('ceng');
    console.log(ceng);
    function bEvent(){
        addEvent(wrapper, 'click', function (e) {
            var e = e || event;
            var target = e.target || e.srcEvent;
            img.src = target.src;
            layer.style.width = "50%";
            layer.style.height = "100%";
            ceng.style.display = "block";
        })
        addEvent(btn,'click',function(e){
            var e = e || event;
            var target = e.target || e.srcEvent;
            layer.style.width = "0";
            layer.style.height = "0";
            ceng.style.display = 'none';

        })
    }
    return function(){
        bEvent();
    }
}())
bindEvent();
//获取指定数组元素的索引。
function isArray(arr,min){
    for(var  i = 0; i < arr.length; i ++){
        if(arr[i] == min){
            return i;
        }
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

//获取可视区窗口尺寸兼容性处理
function getClientOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight,
        }
    } else {
        if (document.compateMode === "CSS1Compate") {
            return {
                w: docuemnt.documentElement.clientWidth,
                h: document.documentElement.clientHeight,
            }
        } else {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        }
    }
}  
//页面滚动条滚动距离兼容性处理
function getScrollOffset(){
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset,
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop,
        }
    }
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
