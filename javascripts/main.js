$(function(){

    var analyser, 
      context,
      jsProcessor,
      microphone,
      data,
      sum,
      x,
      camFeed,
      canvasCarre = $('#canvasCarre'),
      tabCarre = new Array(),
      max = 2000,
      contextCanvas = canvasCarre[0].getContext('2d')
      //height = $(window).height()
      height = 600,
      //width = $(window).width();
      width = 800,
      test = 1;

    navigator.webkitGetUserMedia({audio:true,video:true}, onStream, onError);

    //canvasCarre.height(height);
    //canvasCarre.width(width);

    function randomize(arr) {
  
        arr.sort(function() { 
          return 0.5 - Math.random();
        });
        return arr;  
    
      }

    function onStream(stream) {
      camFeed = document.getElementById('camFeed');
      camFeed.src = webkitURL.createObjectURL(stream);

      context = new webkitAudioContext();
      microphone = context.createMediaStreamSource(stream);
      analyser = context.createAnalyser();
      jsProcessor = context.createJavaScriptNode(1024,1,1);

      microphone.connect(analyser);
      analyser.connect(jsProcessor);
      jsProcessor.connect(context.destination);
      window.setInterval(update, 1000 / 24);
      jsProcessor.onaudioprocess = function(e){
      data = new Uint8Array(10);
        analyser.getByteFrequencyData(data);
      }

    }

    function onError(err) {

      console.log('On a un problème !');

    }

    function update() {

      contextCanvas.clearRect(0, 0, 800, 600);

      contextCanvas.drawImage(camFeed, 0, 0, 800, 600);

      sum = data[0]+data[1]+data[2]+data[3]+data[4]+data[5]+data[6]+data[7]+data[8]+data[9];

      x = 160 * (sum-300) / max;

      for(var k = 0; k < 160 ; k++){
        tabCarre[k] = (k > x) ? 0 : 1 ;
      }
      tabCarre = randomize(tabCarre);

      var canH = 60;
      var canW = 50;
      contextCanvas.fillStyle="white";

      for(var k = 0; k < 160 ; k++){

        var ligne = Math.floor( k / 10 );
        if(tabCarre[k] == 0){

          contextCanvas.fillRect( ligne * canW, (canH * k)-(ligne*canH*10) ,canW,canH);
        }

      }

    }

});