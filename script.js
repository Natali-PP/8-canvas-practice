const canvas = document.querySelector("#draw");

const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.globalCompositeOperation = 'xor';

context.strokeStyle = '#BADA55';
context.lineJoin = 'bevel';
context.lineCap = 'round';
context.lineWidth = 100;

let isDrawing = false;
let lastX =0;
let lastY = 0;
let hue = 0;
let direction = true;
function draw(e){
    if (!isDrawing) return; // stop the function when drawing is don
    
    context.strokeStyle= `hsl(${hue}, 100%, 50%)`;
    
    context.beginPath();
    //start frommmm
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    [lastX, lastY ] = [e.offsetX, e.offsetY];
    hue++;
    if (hue >=360){
        hue =0;
    }

    if (context.lineWidth >= 200 || context.lineWidth <= 1){
        direction = !direction;
    }

    if (direction){
        context.lineWidth++;
    } else{
        context.lineWidth--;
    }
    
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true ;
    [lastX, lastY ] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing =false);

//for touch screens

canvas.addEventListener('touchmove', (e) => {
    draw();
    e.preventDefault();

});
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawing = true ;
    lastX = e.targetTouches[0].pageX;
    lastY = e.event.targetTouches[0].pageY;
});
canvas.addEventListener('touchcancel', () => isDrawing = false);
canvas.addEventListener('touchend', () => isDrawing =false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }
document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);