import {GraphNode} from "./classes/GraphNode.js";
import {Graph} from "./classes/Graph.js";
import {Point} from "./classes/Point.js";
import {Edge} from "./classes/Edge.js";


const canvas: HTMLCanvasElement = document.querySelector('canvas')! as HTMLCanvasElement;
// const width = canvas.offsetWidth;
// const height = canvas.offsetHeight;


const context = canvas.getContext('2d')!;

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

const node1 = new GraphNode(70, 145);
const node2 = new GraphNode(410, 85);

const graph = new Graph();
graph.addNode(node1);
graph.addNode(node2);
const edge1 = new Edge(node1, node2);
graph.addEdge(edge1);

graph.draw(context);

// drawNodesInCircle(context, 8);

