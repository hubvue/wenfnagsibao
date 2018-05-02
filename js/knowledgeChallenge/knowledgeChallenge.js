//全局变量
var arr = ['D','D','A','C','B','B','C','D','A','B'];        //正确答案
var anArr = [];                     //作答答案
var drag = true     //时间锁
var time = document.getElementById('time');
var ceng = document.getElementById('ceng');
var btn = document.getElementById('btn');
var over = document.getElementById('over');
var content = document.getElementById('content');
var scF = document.getElementById('scF');
var error = document.getElementById('error');
var closeBtn = document.getElementById('closeBtn');
var seeError = document.getElementById('seeError');
var disError = document.getElementById('disError');
var tab = document.getElementById('tab');
var disBtn = document.getElementById('disBtn');
var num = 30;
//开始按钮进行答题
function startInit(){
    addEvent(btn,'click',function(){
        ceng.style.display = "none";
        timeInit();        
    });
}
//按钮结束答题
function overGame(){
    addEvent(over,'click',function(){
        drag = false;
    })
}
//时间事件
function timeInit(){
    var timer = setInterval(function(){
        if (drag == false) {
            clearInterval(timer);
            scend(anArr);
        } 
        if (num < 10 && drag == true) {
            time.innerHTML = "00:00:0" + num;
        } else if(num >= 10 && drag == true) {
            time.innerHTML = "00:00:" + num;
        }
        num--;
        if (time.innerHTML == "00:00:00") {
            drag = false;
        }    
    },1000);
}
//作答事件
function answer(){
    addEvent(content,'click',function(e){
        var e = e ||window.event;
        var target = e.target || e.srcElement;
        if(target.className.indexOf('r') != -1){
            console.log(target.name);
            anArr[target.name] = target.value;
        }
    })
}
//弹出分数
function scend(anArr){
    var num = 0;
    tab.innerHTML = "<tr>\
        <th> 题号</th>\
            <th>您的答案</th>\
            <th>正确答案</th>\
                </tr>"
    for(var i = 0; i < arr.length;i ++){
        if(arr[i] == anArr[i]){
            num ++ ;
        }else{
            wrong(anArr[i],arr[i],i);
        }
    }
    answerScend = 100/arr.length * num;
    scF.innerHTML = answerScend;
    error.style.display = 'block';
}
//查看错误解析
function disErr(){
    addEvent(seeError,'click',function(){
        disError.style.display = "block";
    })
}
//错误题目提取
function wrong(an,ana,i){
    if (an === undefined) {
        an = "未填写";
    }
    var tr = document.createElement('tr');
    tr.innerHTML = "<td>"+ (i + 1) +"</td>\
            <td>"+ an +"</td>\
            <td>" + ana +"</td>"
    tab.appendChild(tr);
}
//关闭错误解析页
function disB(){
    addEvent(disBtn,'click',function(){
        disError.style.display = "none";
    })
}
//重新开始事件
function cloBtn(){
    addEvent(closeBtn,'click',function(){
        radio();
        error.style.display = 'none';
        num = 30;
        time.innerHTML == "00:00:30";
        drag = true;
        ceng.style.display = "block";
        tab.innerHTML = "";
        anArr = [];
        
    })
}
//全部单选按钮刷新
function radio(){
    var radios = content.getElementsByTagName('*');
    for(var i = 0;i < radios.length; i ++){
        if(radios[i].className.indexOf('r') != -1){
            radios[i].checked = false;
        }
    }
}
//全局模块函数执行区
function init(){
    startInit();
    overGame();
    answer();
    cloBtn();
    disErr();
    disB();
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
