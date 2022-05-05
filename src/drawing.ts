import {GraphNode} from "./classes/GraphNode.js";
import {Edge} from "./classes/Edge.js";

export const NODE_RADIUS = 30

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
}
