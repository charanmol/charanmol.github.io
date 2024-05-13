var beforeY= window.scrollY;


window.onscroll = function () {
    var afterY = window.scrollY;
    if(beforeY> afterY)
    {
        document.getElementById("box").style.top= "0px"
    }
    else
    {
        document.getElementById("box").style.top= "-60px"
    }
    beforeY = afterY;
}

function ticopacity(){
    document.getElementById("ticimg").style.display="block"
    document.getElementById("ticimg").style.opacity="100%"

}

function ticopacitynone(){
    document.getElementById("ticimg").style.display="none"
    document.getElementById("ticimg").style.opacity="0%"

}
 
function flappyopacity(){
    document.getElementById("flappyimg").style.display="block"
    document.getElementById("flappyimg").style.opacity="100%"

}

function flappyopacitynone(){
    document.getElementById("flappyimg").style.display="none"
    document.getElementById("flappyimg").style.opacity="0%"

}
 
function calcopacity(){
    document.getElementById("calcimg").style.display="block"
    document.getElementById("calcimg").style.opacity="100%"

}

function calcopacitynone(){
    document.getElementById("calcimg").style.display="none"
    document.getElementById("calcimg").style.opacity="0%"

}
 