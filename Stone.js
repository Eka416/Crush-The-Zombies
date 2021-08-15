class Stone {
    constructor(x,y,w,h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        var opt = {
            restitution: 0.8
        }
        this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, opt)
        this.image = loadImage("stone.png")
        World.add(world,this.body)
    }
    display() {
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y)
        strokeWeight(1)
        fill("yellow")
        imageMode(CENTER);
        image(this.image, 0, 0, this.w, this.h)
        noStroke()
        pop();
    }
}