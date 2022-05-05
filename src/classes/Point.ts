export class Point{
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    print = () => console.log(`Point: x=${this.x}, y=${this.y}`);
}