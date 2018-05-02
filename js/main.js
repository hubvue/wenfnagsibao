//全局变量
var form = document.getElementById('form');
var userName = document.getElementById('userName');
var passWord = document.getElementById('passWord');
var btn = document.getElementById('btn');

//事件委托  form表单用户名主事件焦点
function event(){

    addEvent(userName,'focus',function(e){
        var e = e || window.event;
            if(userName.value == "请输入用户名"){
                 userName.value= ''; 
                 userName.style.color = '#000';               
            }
    })
    addEvent(userName,'blur',function(e){
        var e = e || window.event;
        if(userName.value == ""){
            userName.value = "请输入用户名";
            userName.style.color = "#999";
        }
    })
}


function btnEvent(){
    addEvent(btn,'click',function(){
        if(userName.value == '123456' && passWord.value == '123456'){
            window.open('index.html');
        }
    })
}










//全局函数执行
function init(){
    event();
    btnEvent();
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
