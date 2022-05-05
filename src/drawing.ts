import {GraphNode} from "./classes/GraphNode.js";
import {Edge} from "./classes/Edge.js";
import {Point} from "./classes/Point.js";

export const NODE_RADIUS = 15

export function drawNode(context: CanvasRenderingContext2D, node: GraphNode){
    context.moveTo(node.x + NODE_RADIUS, node.y);
    context.fillStyle = '777777';
    context.strokeStyle = '333333';
    context.arc(node.x , node.y , NODE_RADIUS, 0, 360, false);
    context.stroke();
}

export function drawEdge(context: CanvasRenderingContext2D, edge: Edge){
    const lineStart = edge.getStartPoint();
    const lineEnd = edge.getEndPoint();
    context.moveTo(lineStart.x, lineStart.y)
    context.lineTo(lineEnd.x, lineEnd.y)
    context.stroke()
    if(edge.weight){
        let xDiff = Math.abs(lineEnd.x - lineStart.x);
        let middleX = (lineEnd.x - lineStart.x > 0) ? lineStart.x + xDiff/2: lineEnd.x + xDiff/2;
        let yDiff = Math.abs(lineEnd.y - lineStart.y);
        let middleY = (lineEnd.y - lineStart.y > 0) ? lineStart.y + yDiff/2: lineEnd.y + yDiff/2;
        let lineMiddle = new Point(middleX, middleY);
        context.font = "20px Arial";
        context.fillText( `${edge.weight}`,lineMiddle.x, lineMiddle.y);
    }
}
