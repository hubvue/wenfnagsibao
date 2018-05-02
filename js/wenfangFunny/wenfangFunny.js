//全局变量
    var btnRelease = document.getElementById('btn-release');
    var btnrelease = document.getElementById('releaseBtn');
    var releaseText = document.getElementById('releaseText');
    var releasebox = document.getElementById('releasebox');
    var content = document.getElementById('content');
//显示发布层事件
function releaseInit(){
    addEvent(btnRelease,'click',function(){
        releasebox.style.display = "block";
    })
}
//发布信息事件
function releaseTxt(){
    addEvent(btnrelease,'click',function(){
        var value = releaseText.value;
        addRelease(value);
        releaseText.value = "";
        releasebox.style.display = "none";
    })
}
//发布函数
function addRelease(value){
    var contentBox = document.createElement('div');
    contentBox.className = "content-box clearfix";
    contentBox.innerHTML = "<div class=\"w\"></div><div class=\"content-box-img\"></div><div class=\"content-box-right\">\
            <span id=\"content-box-right-subcontent\" class=\"text\">" + value + "</span>\
            <div class=\"content-box-right-message\">\
                <input type=\"text\">\<button class=\"q\">留言</button>\
            </div><div class=\"content-box-right-messageRegion\"></div>\
        </div>";
    content.appendChild(contentBox); 
}
//留言事件
function messageEvent(){
    addEvent(content,'click',function(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if(target.className.indexOf('q') != -1){
            var previousElem = previous(target);
            var value = previousElem.value;
            var messBox = messageBox(target);
            var mess = document.createElement('div');
            mess.className = 'message';
            mess.innerHTML = "<span>佩奇: </span>\
            <span>"+ value + "</span>\
            <input type=\"button\" value=\'删除\' class=\'s\'>";
            if(value != ""){
                messBox.appendChild(mess);
            }
            previousElem.value = "";
            
        }
    })
}
//删除留言
function delMessage(){
    addEvent(content, 'click', function (e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.className.indexOf('s') != -1 && target.value =="删除") {
            var targetParent = target.parentNode;
            targetParent.remove();
        }
    })
}
//删除发布
function delRelease(){
    addEvent(content, 'click', function (e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.className.indexOf('w') != -1 ) {
            var targetParent = target.parentNode;
            targetParent.remove();
        }
    })
}
//全局模块函数执行
function init(){
    releaseInit();
    releaseTxt();
    messageEvent();
    delMessage();
    delRelease();
}
init();



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

//前一个兄弟节点兼容性封装
function previous(elem){
    if (elem.previousSibling.nodeType == 1){
        return elem.previousSibling;        
    } else{
        previous(elem.previousSibling); 
    }
}
//后一个兄弟节点兼容性封装
function next(elem) {
    if (elem.nextSibling.nodeType == 1) {
        return elem.nextSibling;
    } else {
        next(elem.nextSibling);
    }
}
//搜查留言区域
function messageBox(elem){
    return next(elem.parentNode);
}