<script>
  function isMobile()
  {
    return /Android|iPhone/i.test(navigator.userAgent); 
  }
  

  if(isMobile())
  {
    window.location.href='mobile.html';


  }

  function moveButton() {
    var button = document.getElementById('no');
    var maxX = 1200;
    var maxY = 600;

    var randomX = Math.floor(Math.random() * maxX);
    var randomY = Math.floor(Math.random() * maxY);

    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
  }

  function no(){
            window.location.assign("yes.html");
        }
        
</script>