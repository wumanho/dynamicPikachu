let string = `
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

*::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    /*background: #ffe600;*/
    min-height: 100vh;
}

.skin {
    position: relative;
}

.nose {
    border: 10px solid;
    border-color: black transparent transparent transparent;
    width: 0;
    height: 0;
    position: absolute;
    left: 50%;
    top: 245px;
    margin-left: -10px;
    z-index: 10;
}
@keyframes wave {
    0%{
        transform: rotate(0deg);
    }
    33%{
        transform: rotate(-5deg);
    }
    66%{
        transform: rotate(5deg);
    }
    100%{
        transform: rotate(0deg);
    }
}
.nose:hover{
    transform-origin: center bottom;
    animation: wave 300ms infinite linear;
}

.yuan {
    position: absolute;
    background: black;
    width: 20px;
    height: 6px;
    top: -16px;
    left: -10px;
    border-radius: 10px 10px 0 0;
}

.eye {
    border: 4px solid black;
    width: 64px;
    height: 64px;
    position: absolute;
    left: 50%;
    top: 200px;
    margin-left: -32px;
    background: #2e2e2e;
    border-radius: 50%;
}

.eye::before {
    content: "";
    border: 3px solid black;
    width: 25px;
    height: 25px;
    display: block;
    border-radius: 50%;
    background: white;
    position: relative;
    left: 5px;
    top: 5px;
}

.eye.left {
    transform: translateX(-150px);
}

.eye.right {
    transform: translateX(150px);
}

.mouth {
    position: absolute;
    left: 50%;
    top: 300px;
    width: 200px;
    height: 200px;
    transform: translateX(-100px);
}

.mouth .up {
    position: relative;
    top: -20px;
}

.mouth .up .lip {
    border: 3px solid black;
    height: 25px;
    width: 100px;
    border-top-color: transparent;
    position: absolute;
    z-index: 1;
    background: #ffe600;
}

.mouth .up .lip.left {
    border-radius: 0 0 0 30px;
    transform: rotate(-20deg);
    left: 50%;
    margin-left: -100px;
}

.mouth .up .lip.right {
    border-radius: 0 0 30px 0;
    transform: rotate(20deg);
    margin-left: 100px;
}

.mouth .up .lip::before {
    content: "";
    display: block;
    width: 7px;
    height: 25px;
    position: absolute;
    bottom: 0;
    background: #ffe600;
}

.mouth .up .lip::after {
    content: "";
    display: block;
    position: absolute;
    top: -5px;
    width: 100%;
    height: 3px;
    background: #ffe600;
}

.mouth .up .lip.left::before {
    right: -6px;
}


.mouth .up .lip.right::before {
    left: -6px;
}

.mouth .down {
    height: 200px;
    position: absolute;
    top: -13px;
    width: 100%;
    overflow: hidden;
}

.mouth .down .yuan1 {
    border: 2px solid black;
    width: 150px;
    height: 1000px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -75px;
    border-radius: 75px/300px;
    background: #9b000a;
    overflow: hidden;
}

.mouth .down .yuan1 .yuan2{
    width: 200px;
    height: 300px;
    position: absolute;
    bottom: -140px;
    left: 50%;
    margin-left: -100px;
    border-radius: 50%;
    background: #ff485f;
}

.face {
    border: 3px solid black;
    position: absolute;
    left: 50%;
    top: 350px;
    width: 88px;
    height: 88px;
    margin-left: -44px;
    border-radius: 50%;
    background: #ff0000;
}

.face.left{
    transform: translateX(-200px);
}

.face.right{
    transform: translateX(200px);
}

`
let n = 0
let gapTime = 100
let demo = document.querySelector("#demo")
let demo2 = document.querySelector("#demo2")
let id

const player = {
    init:()=>{
        demo.innerText = string.substring(0, n)
        demo2.innerHTML = string.substring(0, n)
        player.play()
        player.bindEvents()
    },
    events:{
        "#btnPause" : "pause",
        "#btnPlay" : "play",
        "#btnSlow" : "slow",
        "#btnNormal" : "normal",
        "#btnFast" : "fast"
    },
    //绑定单击事件
    bindEvents :()=>{
        for (let key in player.events) {
            let value = player.events[key]
            document.querySelector(key).onclick = player[value]
        }
    },
    animation: () => {
        n += 1
        if (n > string.length) {
            window.clearInterval(id)
            return
        }
        demo.innerText = string.substring(0, n)
        demo2.innerHTML = string.substring(0, n)
        demo.scrollTop = demo.scrollHeight
        console.log(n + ":" + demo.innerHTML);
    },
    play:()=>{
        id = setInterval(player.animation, gapTime)
        document.querySelector("#btnPlay").setAttribute("disabled","disabled")
    },
    pause:()=>{
        window.clearInterval(id)
        document.querySelector("#btnPlay").removeAttribute("disabled")
    },
    slow:()=>{
        window.clearInterval(id)
        gapTime = 200
        player.play()
    },
    normal:()=>{
        window.clearInterval(id)
        gapTime = 100
        player.play()
    },
    fast :()=>{
        window.clearInterval(id)
        gapTime = 0
        player.play()
    }
}
//初始化
player.init()

