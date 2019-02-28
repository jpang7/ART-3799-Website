offset = 0
offset1 = 0
offset2 = 0
x = 0
y = 0

function setup() {
    createCanvas(screen.width, screen.height);
    y = random()
}

function draw() {
    background(255);
    noFill();
    stroke(0);

    limit(1000,300,400,400,500,500,600,500)
    // limit(0,0,400,400,500,500,1000,1000)
    limit(1000,400,400,400,500,500,600,500)
    limit(1000+x,400,400+x,400,500+x,500,600+x,500)
    quadLimit([100,200,300,400],[100,300,100,300],true,.1,offset)
    quadLimit([100,200,300,400],[100,100,300,300],true,.1,offset2)
    quadLimit([200,400,600,800],[200,200,600,600],true,.1,1)
    quadLimit([100,200,300,400],[600,600,200,200],true,.1,offset)
    quadLimit([100,200,300,400],[600,600,200,200],true,.1,offset)
    quadLimit([100,200,300,400],[700,700,300,300],true,.1,1)
    quadLimit([100,200,300,400],[700,700,300,300],true,.1,.8)
    quadLimit([100,200,201,202],[800,800,400,400],true,.1,.8)
    quadLimit([600,700,800,900],[700,700,300,300],true,.1,offset1)
    multipleQuad(10,500,500,offset,20)
    offset = random()
    offset2 = random()
    offset1 = offset1 - offset
    x+=10
    y+=5
    if (x > screen.width) x=0
    if (y > screen.width) y=0
}

function gradientLines() {
    for (let i=0; i<screen.width; i+=5){
        stroke(255-i*.10)
        o = i+offset
        line(o,300,o,600)
    }
}

//no offset, no gradient
function limit(x1,y1,x2,y2,x3,y3,x4,y4) {
    let minX = min([x1,x2,x3,x4])
    let maxX = max([x1,x2,x3,x4])
    let minY = min([y1,y2,y3,y4])
    let maxY = max([y1,y2,y3,y4])
    for (let i = minX; i<maxX; i+= 5) {
        stroke(255-(i-minX))
        line(i,minY,i,maxY)
    }
}

function multipleQuad(n,x,y,off) {
    for (let i = 0; i<n; i++) {
        quadLimit([x*i+off,2*x*i,3*x*i,4*x*i],[y,3*y,y,3*y],true,.1,offset)
    }
    
}

//Precondition: no x can equal each other, x,y are arrays with 4 elements
function quadLimit(x,y,gradient,grad,offset) {
    line12 = makeLine(x[0],y[0],x[1],y[1])
    line13 = makeLine(x[0],y[0],x[2],y[2])
    line24 = makeLine(x[1],y[1],x[3],y[3])
    line34 = makeLine(x[2],y[2],x[3],y[3])

    let top = []
    let bot = []
    stroke(0)

    for (let i=x[0]; i<x[3]; i+=4) {
        if (gradient) {
            stroke(255-i*grad*offset)
        } 
        if (i >= x[0] && i < x[1]) {
            top = line12
            bot = line13

        } else if (i >= x[1] && i < x[2]) {
            top = line24
            bot = line13
        } else if (i >= x[2] && i < x[3]) {
            top = line24
            bot = line34
        }
        if (y[1] > y[2]) line(i,getY(top[0],top[1],i),i,getY(bot[0],bot[1],i))
        else line(i,getY(bot[0],bot[1],i),i,getY(top[0],top[1],i))
    }
}

//Precondition: x1 < x2
function makeLine(x1,y1,x2,y2) {
    slope = (y2-y1)/(x2-x1)
    yint = y1 - slope*x1
    return [slope,yint]
}

function getY(slope,yint,x) {
    return slope*x + yint
}