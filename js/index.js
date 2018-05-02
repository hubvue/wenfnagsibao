
//导航栏的点击事件---》事件委托
        var clickInit = (function(){
            var ulBox = document.getElementById('ulBox');
            var contentMiddle = document.getElementById('contentMiddle')
            var e,target;
            function event(box,middle){
                addEvent(box, 'click', function (e) {
                    e = e || window.event;
                    target = e.target || e.srcEvent;
                    if (target.className.indexOf('p') != -1){
                        middle.style.display = "none";
                    }
                });
            }     
            return function(){
                event(ulBox, contentMiddle);
            }
        }());
//index 轮播
        var lunboInit = (function(){
            var box = document.getElementById('indexLunbo');
            var imgs = findChild(box);
            var len = imgs.length;
            var imgWidth = parseInt(getStyle(imgs[0],'width'));
            var boxLeft = parseInt(getStyle(box,'left'));
            var timer = null;
            var firstTime = 0,lastTime;
            function active(){
                timer = setInterval(function () {
                    box.style.left = parseInt(getStyle(box, 'left')) + -1 + 'px';
                    if (parseInt(getStyle(box, 'left')) < -2500) {
                        box.style.left = '-500px';
                    }
                },10)
            }
            return function(){
                active();
            }
        }());


//方法执行总函数
        init();
        function init() {
            lunboInit();
            clickInit();
        }


//封装查找子元素节点兼容性处理
        function findChild(elem){
            var arr = [];
            var childs = elem.childNodes;
            for(var prop in childs){
                if(childs.hasOwnProperty(prop)){
                    if(childs[prop].nodeType == 1){
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

