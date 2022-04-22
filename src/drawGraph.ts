const canvas: HTMLCanvasElement = document.querySelector('canvas')! as HTMLCanvasElement;
// const width = canvas.offsetWidth;
// const height = canvas.offsetHeight;
const NODE_RADIUS = 30

const context = canvas.getContext('2d')!;

class Point{
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    print = () => console.log(`Point: x=${this.x}, y=${this.y}`);
}

function drawNode(context: CanvasRenderingContext2D, p: Point){
    context.moveTo(p.x + NODE_RADIUS, p.y);
    context.fillStyle = '777777';
    context.strokeStyle = '333333';
    context.arc(p.x , p.y , NODE_RADIUS, 0, 360, false);
    context.stroke();
}

function getEdgeStart(p1: Point, p2: Point){
    const degree = Math.atan((p2.x - p1.x)/(p2.y - p1.y));
    return new Point(p1.x + ((p2.x > p1.x) ? -1: 1 ) * NODE_RADIUS * Math.sin(degree),
        p1.y + ((p2.y > p1.y) ? 1 : -1) * NODE_RADIUS * Math.cos(degree));
}
const getEdgeEnd = (p1: Point, p2: Point) => getEdgeStart(p2, p1);

function drawEdge(context: CanvasRenderingContext2D, p1: Point, p2: Point){
    const lineStart = getEdgeStart(p1, p2);
    const lineEnd = getEdgeEnd(p1, p2);
    context.moveTo(lineStart.x, lineStart.y)
    context.lineTo(lineEnd.x, lineEnd.y)
    context.stroke()
}

let p1 = new Point(70, 145);
let p2 = new Point(410, 85);

drawNode(context, p1)
drawNode(context, p2)
drawEdge(context, p1, p2)

let p3 = new Point(183, 521)
drawNode(context, p3)
drawEdge(context, p3, p2)


function generateNodesInCircle(amount: number): Point[]{
    return generateNodeInCircleOuter(amount)();
}

function generateNodeInCircleOuter(startingAmount: number){
    const bigCircleRadius = 140;
    const bigCircleMiddle = new Point(300, 300);
    const degreeDiff = Math.PI/180 * 360/startingAmount;
    function generateNodeInCircle(nodesGenerated: Point[] = [], amountLeft: number = startingAmount, degree: number = 0): Point[]{
        if(amountLeft == 0) return nodesGenerated;
        let x = bigCircleMiddle.x + Math.cos(degree) * bigCircleRadius;
        let y = bigCircleMiddle.y + Math.sin(degree) * bigCircleRadius;
        const newNode = new Point(x, y);
        return generateNodeInCircle(
            [...nodesGenerated, newNode],
            amountLeft-1,
            degree + degreeDiff
        );
    }
    return generateNodeInCircle
}

function drawNodesInCircle(context: CanvasRenderingContext2D, amount: number){
    console.log(generateNodesInCircle(amount))
    generateNodesInCircle(amount).forEach( node => drawNode(context, node));
}

drawNodesInCircle(context, 8);