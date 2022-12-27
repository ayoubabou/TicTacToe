document.getElementById("play").style.display = "none"
const cross  = document.getElementsByClassName("xo")[0]
const circle  = document.getElementsByClassName("xo")[1]
let mychoice, compchoice
let isclicked = ischecked = false
function checkclick(){
    if(isclicked && ischecked){
        document.getElementById("playbtn").style.background = "#444"
        document.getElementById("playbtn").style.color = "white"
        document.getElementById("playbtn").style.border = "2px solid white"
    }
}
function btnselected(btn1,btn2) {
    btn1.style.background = "#444"
    btn1.style.color = "white"
    btn2.style.background = "white"
    btn2.style.color = "#222"
    isclicked = true
}
circle.onclick = () => {
    btnselected(circle,cross)
    checkclick()
    mychoice = "O"
    compchoice = "X"
}
cross.onclick = () => {
    btnselected(cross,circle)
    checkclick()
    mychoice = "X"
    compchoice = "O"
}
let compBegins = iBegin = false
let decider = 0
let inps = document.getElementsByTagName("input")

function inpOne(){
    inps[1].checked = false
    ischecked = true
    iBegin = true
    compBegins = false
    checkclick()
    inps[1].disabled = false
    inps[0].disabled = true
}
function inpTwo(){
    inps[0].checked = false
    ischecked = true
    iBegin = false
    compBegins = true
    checkclick()
    inps[0].disabled = false
    inps[1].disabled = true
}


let ttt = [
    "","","",
    "","","",
    "","",""
]
let winlose = false
let draw = false
let rands = [0,1,2,3,4,5,6,7,8]
let choosenelements = []
let spans = document.getElementsByTagName("span")
let rand
let zerofoureight = twofoursix = zeroonetwo = threefourfive = sixseveneight = zerothreesix = onefourseven = twofiveeight = false

function TwoinaRow(arr,elm){
    let noXO = 0
    for (const elm of arr){
        if(elm === ""){
            noXO++
        }
    }
    if (noXO === 1){
        if(arr[0]===arr[1]||arr[1]===arr[2]||arr[2]===arr[0]){
            if ([arr[0],arr[1],arr[2]].indexOf(elm) !== -1) {
                return true   
            }
        }   
    }
    return false
}



function checkwinlose() {
    for (let i = 0; i < 3; i++) {
        if(ttt[i] != "" && ttt[i] == ttt[i+3] && ttt[i] == ttt[i+6]){
            winlose = true
        }
        if(ttt[i*3] != "" && ttt[i*3] == ttt[i*3+1] && ttt[i*3] == ttt[i*3+2]){
            winlose = true
        }
    }
    if(ttt[0] != "" && ttt[0] == ttt[4] && ttt[0] == ttt[8]){
        winlose = true
    }
    if(ttt[2] != "" && ttt[2] == ttt[4] && ttt[2] == ttt[6]){
        winlose = true
    }
    if(!winlose && choosenelements.length==9){
        alert("It is a Draw!")
        draw = true
    }
    if(winlose && choosenelements[choosenelements.length-1]==compchoice){
        alert("Sorry, you Lose!!")
    }
    if(winlose && choosenelements[choosenelements.length-1]==mychoice){
        alert("Congratulations!! You Win")
    }
}

function shuffled_arr(array) {
    let funcarr = []
    while(funcarr.length!=array.length){
        let randfunc = array[Math.floor(Math.random()*array.length)]
        if(funcarr.indexOf(randfunc)==-1){funcarr.push(randfunc)}
    }
    return funcarr
}
function compfunc(arr){
    for(let index of shuffled_arr(arr)){
        if (spans[index].innerHTML === ""){
            spans[index].innerHTML = compchoice
            ttt[index] = compchoice
            rands.splice(rands.indexOf(index),1)
            break
        }
    }
}
function compfuncTwo(){
    if([ttt[0],ttt[8],ttt[2],ttt[6]].indexOf("")!=-1){
        compfunc([0,8,6,2,4])
    }else{
        rand = rands[Math.floor(Math.random()*rands.length)]
        spans[rand].innerHTML = compchoice
        ttt[rand] = compchoice
        rands.splice(rands.indexOf(rand),1)
    }
}

function compchooseTwoinaRow(elm) {
    if(!zerofoureight && TwoinaRow([ttt[0],ttt[4],ttt[8]],elm)){
        compfunc([0,4,8])
        zerofoureight = true
    }else if(!twofoursix && TwoinaRow([ttt[2],ttt[4],ttt[6]],elm)){
        compfunc([2,4,6])
        twofoursix = true
    }else if(!zeroonetwo && TwoinaRow([ttt[0],ttt[1],ttt[2]],elm)){
        compfunc([0,1,2])
        zeroonetwo = true
    }else if(!threefourfive && TwoinaRow([ttt[3],ttt[4],ttt[5]],elm)){
        compfunc([3,4,5])
        threefourfive = true
    }else if(!sixseveneight && TwoinaRow([ttt[6],ttt[7],ttt[8]],elm)){
        compfunc([6,7,8])
        sixseveneight = true
    }else if(!zerothreesix && TwoinaRow([ttt[0],ttt[3],ttt[6]],elm)){
        compfunc([0,3,6])
        zerothreesix = true
    }else if(!onefourseven && TwoinaRow([ttt[1],ttt[4],ttt[7]],elm)){
        compfunc([1,4,7])
        onefourseven = true
    }else if(!twofiveeight && TwoinaRow([ttt[2],ttt[5],ttt[8]],elm)){
        compfunc([2,5,8])
        twofiveeight = true
    }
}

document.getElementById("playbtn").onclick = ()=>{
    if(isclicked && ischecked){
        document.getElementById("play").style.display = "block"
        document.getElementById("start").style.display = "none"
        if(compBegins && choosenelements.length == 0){
            decider = 1
            compfuncTwo()
            choosenelements.push(compchoice)
            checkwinlose()
        }
        for (let ind = 0; ind < 9; ind++){
            spans[ind].onclick = () =>{
                if(!winlose && !draw){
                    if(iBegin || choosenelements[choosenelements.length-1]==compchoice){
                        if(spans[ind].innerHTML === ""){
                            ttt[ind] = mychoice
                            spans[ind].innerHTML = mychoice
                            rands.splice(rands.indexOf(ind),1)
                            choosenelements.push(mychoice)
                            checkwinlose()    
                            if(!winlose && !draw){
                                while(rands.length%2==decider){
                                    compchooseTwoinaRow(compchoice)
                                    if(rands.length%2==(decider+1)%2){break}
                                    compchooseTwoinaRow(mychoice)
                                    if(rands.length%2==(decider+1)%2){break}
                                    compfuncTwo()
                                }
                                choosenelements.push(compchoice)
                                checkwinlose()    
                            }
                        }
                    }   
                }
            }
        }
    }
}
function playagain_exit(){   
    document.getElementById("play").style.display = "none"
    document.getElementById("start").style.display = "block"
    winlose = draw = isclicked = ischecked = inps[0].checked = inps[1].checked = inps[0].disabled = inps[1].disabled = false 
    choosenelements = []
    rands = [0,1,2,3,4,5,6,7,8]
    for (let index = 0; index < spans.length; index++) {
        spans[index].innerHTML = ""
    }
    cross.style.background = "white"
    cross.style.color = "#444"
    circle.style.background = "white"
    circle.style.color = "#444"
    document.getElementById("playbtn").style.background = "white"
    document.getElementById("playbtn").style.color = "#444"
    document.getElementById("pgexitbtn").style.background = "#444"
    document.getElementById("pgexitbtn").style.color = "white"
    zerofoureight = twofoursix = zeroonetwo = threefourfive = sixseveneight = zerothreesix = onefourseven = twofiveeight = false
    ttt = [
        "","","",
        "","","",
        "","",""
    ]
    decider = 0
    compBegins = iBegin = false
}
