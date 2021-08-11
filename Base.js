class Base {
    constructor(x,y,w,h,color,isStatic) {
        this.w = w
        this.h = h
        this.x = x
        this.y = y
        var opt = {
            isStatic: isStatic
        }
        this.body = Bodies.rectangle(x,y,w,h,opt)
        this.color = color
        World.add(world,this.body)
    }
    display() {
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y)
        rectMode(CENTER);
        fill(this.color)
        rect(0, 0, this.w, this.h);
        pop();
    }
}