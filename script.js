// function imghover(event){
//     var id = event.target.id;
//     var element = event.target;
//    element.classList.add('blurred');
//    element.classList.add('overlay');
//    document.getElementById("text-view").style.display = "flex";
//    var rect = element.getBoundingClientRect();
//    var leftx = rect.left + window.scrollX;
//    var topy = rect.top + window.scrollY;
//    var rightx = rect.right + window.scrollX;
//    var bottomy = rect.bottom + window.scrollY;
//    console.log ('leftx:',leftx +'topy:', topy + 'rightx: ',rightx + 'bottomy:',bottomy);
//    var imgcenterx= (leftx/2 + rightx/2);
//    var imgcentery = (topy/2 + bottomy/2);

//    var text = document.getElementById("text-view");
//    var rect2 = text.getBoundingClientRect();
//    var textleftx = rect2.left + window.scrollX;
//    var textrightx = rect2.right + window.scrollX;
//    var texttopy = rect2.top + window.scrollY;
//    var textbottomy = rect2.bottom + window.scrollY;
//    var halftextlength= (textrightx - textleftx)/2;
//    var halftextwidth = (textbottomy - texttopy)/2;

//    console.log('halftextlenght=',halftextlength)

//    var textleftinput = imgcenterx - halftextlength;
//    var texttopinput = imgcentery - halftextwidth; 
   
//    text.style.left= textleftinput + 'px';
//    text.style.top = texttopinput + 'px';

   
// }

// function imgout(event){
//     var element = event.target;
//     element.classList.remove('blurred');
//     element.classList.remove('overlay');
//     document.getElementById("text-view").style.display = "none";
// }






function imghover(event) {
    var element = event.target;
    var container = element.parentElement;
    var textView = container.querySelector('.text-view');
    element.classList.add('blurred');
    element.classList.add('overlay');
    textView.style.display = 'flex';
}

function imgout(event) {
    var element = event.target;
    var container = element.parentElement;
    var textView = container.querySelector('.text-view');
    element.classList.remove('blurred');
    element.classList.remove('overlay');
    textView.style.display = 'none';
}










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
 

function digclick(){
    document.getElementById("digimg").style.display="flex"
    document.getElementById("socialimg").style.display="none"
    document.getElementById("logoimg").style.display="none"
    document.getElementById("dig").style.borderTop="1px solid white"
    document.getElementById("social").style.borderTop="0px solid white"
    document.getElementById("logo").style.borderTop="0px solid white"
}

function logoclick(){
 document.getElementById("digimg").style.display="none"
 document.getElementById("socialimg").style.display="none"
 document.getElementById("logoimg").style.display="flex"
 document.getElementById("logo").style.borderTop="1px solid white"
 document.getElementById("dig").style.borderTop="0px solid white"
 document.getElementById("social").style.borderTop="0px solid white"
}

function socialclick(){
    document.getElementById("digimg").style.display="none"
    document.getElementById("socialimg").style.display="flex"
    document.getElementById("logoimg").style.display="none"
    document.getElementById("social").style.borderTop="1px solid white"
    document.getElementById("logo").style.borderTop="0px solid white"
    document.getElementById("dig").style.borderTop="0px solid white"


}


