//declaration of variables
let xPos;
let simState;
let holeX;
let holeState; //open/closed
let timeOpen;
let timeClose;
let t;
var output = [
  ["Time(s)", "Position(m)"]
]; //output csv array

//check if the hole is currently opened
function holeUpdate() {
  if (t >= timeOpen && t <= timeClose) {
    return true;
  } else {
    return false;
  }
}

//draw the background
function drawBack() {
  noStroke();
  fill("greenyellow")
  rect(0, 0, 100, 100);
  fill("forestgreen");
  rect(100, 0, 600, 100);
  fill("white")
  rect(0, 100, 700, 30)
  fill("black")
  for (let i = 50; i < 700; i += 50) { //set the scale
    rect(i, 90, 5, 20);
    textSize(16);
    text(i + "m", i - 10, 125);
  }
  fill("gray");
  circle(startingPosition, 50, 5); //tee
}

//Initialize different courses
function hole_init(num) {
  holeState = false;
  simState = true;
  if (num == 1) {
    holeX = 200
    timeOpen = 3500
    timeClose = 5500
  } else if (num == 2) {
    holeX = 350
    timeOpen = 2000
    timeClose = 3500
  } else if (num == 3) {
    holeX = 425
    timeOpen = 3000
    timeClose = 4000
  } else if (num == 4) {
    holeX = 575
    timeOpen = 4000
    timeClose = 4500
  } else if (num == 5) {
    holeX = 400
    timeOpen = 1500
    timeClose = 2000
  } else if (num == 6) {
    holeX = 225
    timeOpen = 2500
    timeClose = 3000
  } else if (num == 7) {
    holeX = 150
    timeOpen = 1000
    timeClose = 1500
  } else if (num == 8) {
    holeX = 690
    timeOpen = 3000
    timeClose = 3500
  } else if (num == 9) {
    holeX = 500
    timeOpen = 500
    timeClose = 1000
  } else { //invalid input
    clear();
    textSize(32);
    simState = false;
    background(255, 255, 255);
    textFont('Goergia');
    text("Invalid number. Please pick from 0 - 9.", 100, 200);
  }
}

//load pictures
function preload() {
  winPic = loadImage("win.png");
  losePic = loadImage("lose.png");
}

//set up the simulation
function setup() {
  createCanvas(800, 400);
  t = 0; //set the timer to 0
  hole_init(holeNumber);
  frameRate(1 / deltaT);
  xPos = startingPosition;
  if (xPos > 100 || xPos < 0) { //if starting position is invalid
    clear();
    textSize(32);
    simState = false;
    background(255, 255, 255);
    textFont('Georgia');
    text("Invalid starting position!", 100, 200);
  } else if(nextX(1) != (1 + velocity * deltaT)) { //check nextX
    clear();
    textSize(32);
    simState = false;
    background(255, 255, 255);
    textFont('Georgia');
    text("Check the nextX function again!", 100, 200);
  }
  drawBack();
}

//function to download csv
function initCSV() {
  //output csv
  //reference: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
  let csvContent = "data:text/csv;charset=utf-8,";
  output.forEach(function(rowArray) {
    let rows = rowArray.join(",");
    csvContent += rows + "\r\n";
  });
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "Mini_Golf.csv");
  document.body.appendChild(link);
  link.click(); // This will download the data file named "my_data.csv".
}

//the main loop that handles the simulation
function draw() {
  if (simState) { //if the simulation is going on 
    output.push([t / 1000, xPos]);
    if (xPos > 700) { //if the ball's out of boundary, end
      //lose condition
      clear();
      imageMode(CORNER);
      image(losePic, 0, 0);
      simState = false;
    } else if (xPos > holeX - 2 && xPos < holeX + 2 && holeUpdate()) {
      //win condition
      clear();
      imageMode(CORNER);
      image(winPic, 0, 0);
      simState = false;
    } else { //keep the simulation going
      drawBack();
      if (holeUpdate()) {
        fill("black");
        circle(holeX, 50, 20);
      } else {
        stroke("black");
        fill("forestgreen");
        circle(holeX, 50, 20);
      }
      noStroke();
      fill("white");
      circle(xPos, 50, 15); //**initialize ball after hole**
    }
    xPos = nextX(xPos);
    t += deltaT * 1000; //update time
  } else { //if the simulation has ended, show the download button
  var btn = document.getElementById("button") //button to toggle motion map
  btn.onclick = function() {
    initCSV();
  }
    btn.style.visibility = "visible";
  }
}