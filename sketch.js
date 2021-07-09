// noprotect

var increment = 0.05;
var scl = 10; //the scale
var cols, rows;

var zoff = 0; //time

var fr; //framerate

var particles = [];
var flowfield;

var magSlider;
var resetButton;

function setup() {
  createCanvas(800, 600);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP();
  magSlider = createSlider(0, 5, 0.5, 0.1);
  resetButton = createButton('Reset');
  resetButton.mousePressed(resetCanvas);

  for (var i = 0; i < 1000; i++) {
    particles.push(new Particle());
  }

  flowfield = new Array(rows * cols);
  background(255);

}

function draw() {


  var yoff = 0;

  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {

      var index = x + (y * cols);
      var angle = map(noise(xoff, yoff, zoff), 0, 1, 0, (PI * 8));
      var v = p5.Vector.fromAngle(angle);
      v.setMag(magSlider.value());
      flowfield[index] = v;
      xoff += increment;
      // stroke(0, 50);
      // strokeWeight(1);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += increment;
  }
  zoff += increment / 5;
  fr.html("Framerate: " + floor(frameRate()));

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].edges();
    particles[i].update();
    particles[i].show();
  }
}

function resetCanvas() {
  background(255);
}