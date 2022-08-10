x = 0;
y = 0;

draw_apple = "";
screen_width = 0;
screen_height = 0;
apple = "";
speak_data = "";
var SpeechRecognition = window.webkitSpeechRecognition;
to_number = 0;
var recognition = new SpeechRecognition();
function preload() {
  apple=loadImage("https://i.postimg.cc/pTLQ2z4y/apple.png");
}
function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
  to_number=Number(content);
  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "Started Drawing Apple";
    draw_apple="set"; 
  }
  else {
    document.getElementById("status").innerHTML = "Speech has not recognised a number";
  }
}

function setup() {
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
    canvas = createCanvas(screen_width - 150, screen_height - 150);
    canvas.position(0, 150);
}

function draw() {
  if(draw_apple == "set")
  {
    for(i = 1; i <= to_number; i++) {
      x =   Math.floor(Math.random()*600);
      y =   Math.floor(Math.random()*400);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data= to_number + "Apples drawn";
    speak();
    draw_apple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
