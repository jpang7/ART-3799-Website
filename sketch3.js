var coords = [40, 40, 80, 60, 100, 100, 60, 120, 50, 150];

function setup() {
    createCanvas(1000, 1000);
    y = random()
}

function draw() {
    background(255);
    noFill();
    stroke(0);

    y += random()/100
    // y -= random()
    // y--
    // y++
    for (let x=0; x<y; x++) {
        beginShape();
        curveVertex(40+x*10*y,40);
        curveVertex(40+x*10*y,40);
        curveVertex(80+x*10*y,60);
        curveVertex(100,100);
        curveVertex(60*y,120);
        curveVertex(50*y,150);
        curveVertex(50,150);
        curveVertex(300,300);
        curveVertex(1000,1000);
        endShape();
    }


    
}