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
 