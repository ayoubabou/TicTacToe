const play = document.getElementById("play")
play.classList.add("hide")
const start = document.getElementById("start")
const cross  = document.getElementById("cross")
const circle  = document.getElementById("circle")
const playbtn = document.getElementById("playbtn")
let mychoice, compchoice = null
let compBegins = iBegin = false
let inps = document.getElementsByTagName("input")

// Check if choices are done to play 
function checkclick(){
    if((iBegin || compBegins) && (mychoice != null || compchoice != null)){
        playbtn.classList.remove("switchcolor")
    }else{
        playbtn.classList.add("switchcolor")
    }
}
// circle or cross
function circlecross(btn1,btn2,choice1,choice2){
    btn1.classList.remove("switchcolor")
    btn2.classList.add("switchcolor")
    mychoice = choice1
    compchoice = choice2
    checkclick()
}
circle.onclick = () => {
    circlecross(circle,cross,"O","X")
}
cross.onclick = () => {
    circlecross(cross,circle,"X","O")
}
// who begins
function check(x,y,a,b){
    iBegin = a
    compBegins = b
    checkclick()
    inps[x].checked = inps[x].disabled = false
    inps[y].disabled = true
}
function inpOne(){
    check(1,0,true,false)
}
function inpTwo(){
    check(0,1,false,true)
}

let winlose = draw = false
let onetonine = [0,1,2,3,4,5,6,7,8]
let choosenelements = []
let ttt = document.getElementsByTagName("span")

// Check wether (2 or 3 circles)/(2 or 3 crosses) in one line
function TwoThreeinaLine(arr,elm){
    let elmnum = noXO = 0
    for (const item of arr){
        if(item.innerHTML === elm){elmnum++}
        else if(item.innerHTML === ""){noXO++}
    }
    if((elmnum==3)||(noXO==1 && elmnum == 2)){
        return elmnum
    }
    return -1
}
// Color the line after win/lose
function winlosefunc(arr) {
    if(TwoThreeinaLine(arr,compchoice)==3 ||TwoThreeinaLine(arr,mychoice)==3){
        winlose = true
        for (let item of arr) {
            item.classList.add("switchcolor")
        }
    }
}
// Check wether there is a win/lose or a draw to show the alert messages
function checkwinlose() {
    for (let i = 0; i < 3; i++) {
        winlosefunc([ttt[i],ttt[i+3],ttt[i+6]])
        winlosefunc([ttt[i*3],ttt[i*3+1],ttt[i*3+2]])
    }
    winlosefunc([ttt[0],ttt[4],ttt[8]])
    winlosefunc([ttt[2],ttt[4],ttt[6]])
    if(!winlose && choosenelements.length==9){
        alert("It is a Draw!")
        draw = true
    }else if(winlose && choosenelements[choosenelements.length-1]==compchoice){
        alert("Sorry, you Lose!!")
    }else if (winlose && choosenelements[choosenelements.length-1]==mychoice){
        alert("Congratulations!! You Win")
    }
}
// Put a computerchoice in a line
function compfunc(arr){
    let shuffled_arr = []
    while(shuffled_arr.length!=arr.length){
        let randnum = arr[Math.floor(Math.random()*arr.length)]
        if(shuffled_arr.indexOf(randnum)==-1){shuffled_arr.push(randnum)}
    }
    for(let item of shuffled_arr){
        if (ttt[item].innerHTML === ""){
            ttt[item].innerHTML = compchoice
            onetonine.splice(onetonine.indexOf(item),1)
            break
        }
    }
    choosenelements.push(compchoice)
    checkwinlose()
}
function compfuncTwo(){
    if([ttt[0].innerHTML,ttt[8].innerHTML,ttt[2].innerHTML,ttt[6].innerHTML].indexOf("")!=-1){
        compfunc([0,8,6,2,4])
    }else{
        compfunc(onetonine)
    }
}

function compchooseTwoThreeinaLine(elm) {
    if(TwoThreeinaLine([ttt[0],ttt[4],ttt[8]],elm)==2){
        compfunc([0,4,8])
    }else if(TwoThreeinaLine([ttt[2],ttt[4],ttt[6]],elm)==2){
        compfunc([2,4,6])
    }else if(TwoThreeinaLine([ttt[0],ttt[1],ttt[2]],elm)==2){
        compfunc([0,1,2])
    }else if(TwoThreeinaLine([ttt[3],ttt[4],ttt[5]],elm)==2){
        compfunc([3,4,5])
    }else if(TwoThreeinaLine([ttt[6],ttt[7],ttt[8]],elm)==2){
        compfunc([6,7,8])
    }else if(TwoThreeinaLine([ttt[0],ttt[3],ttt[6]],elm)==2){
        compfunc([0,3,6])
    }else if(TwoThreeinaLine([ttt[1],ttt[4],ttt[7]],elm)==2){
        compfunc([1,4,7])
    }else if(TwoThreeinaLine([ttt[2],ttt[5],ttt[8]],elm)==2){
        compfunc([2,5,8])
    }
}

playbtn.onclick = ()=>{
    document.getElementById("choice").innerHTML = "You chose :<br>"+mychoice
    if((iBegin || compBegins) && (mychoice != null || compchoice != null)){
        start.classList.add("hide")
        play.classList.remove("hide")
        if(compBegins && choosenelements.length == 0){
            compfuncTwo()
        }
        for (let ind = 0; ind < 9; ind++){
            ttt[ind].onclick = () =>{
                if((!winlose && !draw) && (iBegin || choosenelements[choosenelements.length-1]==compchoice)){
                    if(ttt[ind].innerHTML === ""){
                        ttt[ind].innerHTML = mychoice
                        onetonine.splice(onetonine.indexOf(ind),1)
                        choosenelements.push(mychoice)
                        checkwinlose()
                        if(!winlose && !draw){
                            while(choosenelements[choosenelements.length-1]==mychoice){
                                compchooseTwoThreeinaLine(compchoice)
                                if(choosenelements[choosenelements.length-1]==compchoice){break}
                                compchooseTwoThreeinaLine(mychoice)
                                if(choosenelements[choosenelements.length-1]==compchoice){break}
                                compfuncTwo()
                            }
                        }
                    }
                }
            }
        }
    }
}
function playagain_exit(){   
    play.classList.add("hide")
    start.classList.remove("hide")
    winlose = draw = inps[0].checked = inps[1].checked = inps[0].disabled = inps[1].disabled = false 
    choosenelements = []
    onetonine = [0,1,2,3,4,5,6,7,8]
    for (let index = 0; index < ttt.length; index++) {
        ttt[index].innerHTML = ""
        ttt[index].classList.remove("switchcolor")
    }
    compBegins = iBegin = false
    mychoice = compchoice = null
    playbtn.classList.add("switchcolor")
    cross.classList.add("switchcolor")
    circle.classList.add("switchcolor")
}



