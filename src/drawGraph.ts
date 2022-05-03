import {Point, Graph, GraphNode, Edge} from './classes.js';
const canvas: HTMLCanvasElement = document.querySelector('canvas')! as HTMLCanvasElement;
// const width = canvas.offsetWidth;
// const height = canvas.offsetHeight;
const NODE_RADIUS = 30

const context = canvas.getContext('2d')!;

function drawNode(context: CanvasRenderingContext2D, node: GraphNode){
    context.moveTo(node.x + NODE_RADIUS, node.y);
    context.fillStyle = '777777';
    context.strokeStyle = '333333';
    context.arc(node.x , node.y , NODE_RADIUS, 0, 360, false);
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

function generateNodesInCircle(startingAmount: number){
    const bigCircleRadius = 140;
    const bigCircleMiddle = new Point(300, 300);
    const degreeDiff = Math.PI/180 * 360/startingAmount;
    function generateNodeInCircle(nodesGenerated: Point[] = [],
                                  amountLeft: number = startingAmount,
                                  degree: number = 0): Point[]{
        if(amountLeft == 0) return nodesGenerated;
        const newNode = new Point(bigCircleMiddle.x + Math.cos(degree) * bigCircleRadius,
            bigCircleMiddle.y + Math.sin(degree) * bigCircleRadius);
        return generateNodeInCircle(
            [...nodesGenerated, newNode],
            amountLeft-1,
            degree + degreeDiff
        );
    }
    return generateNodeInCircle();
}

// function drawNodesInCircle(context: CanvasRenderingContext2D, amount: number){
//     const nodesInCircle: Point[] = generateNodesInCircle(amount);
//     nodesInCircle.forEach( node => drawNode(context, node));
//     // nodesInCircle.forEach( node =>{
//     //     const amountOfEdges
//     // } )
// }

const node1 = new GraphNode(70, 145);
const node2 = new GraphNode(410, 85);

drawNode(context, node1)
drawNode(context, node2)
drawEdge(context, node1, node2)

let node3 = new GraphNode(183, 521)
drawNode(context, node3)
drawEdge(context, node3, node2)

const graph = new Graph();
graph.addNode(node1);


// drawNodesInCircle(context, 8);

