import {GraphNode} from "./classes/GraphNode.js";
import {Graph} from "./classes/Graph.js";
import {Point} from "./classes/Point.js";
import {Edge} from "./classes/Edge.js";

const canvas: HTMLCanvasElement = document.querySelector('canvas')! as HTMLCanvasElement;
// const width = canvas.offsetWidth;
// const height = canvas.offsetHeight;


const context = canvas.getContext('2d')!;

const node1 = new GraphNode(70, 145);
const node2 = new GraphNode(410, 85);

const graph = new Graph();
graph.addNode(node1);
graph.addNode(node2);
const edge1 = new Edge(node1, node2);
graph.addEdge(edge1);

function generateNodesInCircle(startingAmount: number){
    const bigCircleRadius = 140;
    const bigCircleMiddle = new Point(300, 300);
    const degreeDiff = Math.PI/180 * 360/startingAmount;
    function generateNodeInCircle(nodesGenerated: GraphNode[] = [],
                                  amountLeft: number = startingAmount,
                                  degree: number = 0): GraphNode[]{
        if(amountLeft == 0) return nodesGenerated;
        const newNode = new GraphNode(bigCircleMiddle.x + Math.cos(degree) * bigCircleRadius,
            bigCircleMiddle.y + Math.sin(degree) * bigCircleRadius);
        return generateNodeInCircle(
            [...nodesGenerated, newNode],
            amountLeft-1,
            degree + degreeDiff
        );
    }
    return generateNodeInCircle();
}

// random in a way that nodes are connected randomly and random amount of edges
function generateRandomTree(nodesAmount: number){
    const nodes = generateNodesInCircle(nodesAmount);
    let connectedNodes: GraphNode[] = [nodes[0]];
    let edges: Edge[] = [];
    while(connectedNodes.length != nodes.length){
        let unconnectedNodes = nodes.filter(n => connectedNodes.indexOf(n) == -1 )
        let unconnectedNode = unconnectedNodes[Math.floor(Math.random() * unconnectedNodes.length)]
        let connectedNode: GraphNode = connectedNodes[Math.floor(Math.random() * connectedNodes.length)]
        const randomWeight =  Math.floor( 1 + (Math.random()) * 10);
        let newEdge = connectedNode.connect(unconnectedNode, randomWeight)
        edges = [...edges, newEdge];
        connectedNodes = [...connectedNodes, unconnectedNode];
    }

    return {nodes, edges};
}

let randomTree = generateRandomTree(5);
let nodes = randomTree.nodes;
let edges = randomTree.edges;
nodes.forEach(n => graph.addNode(n));
edges.forEach(e => graph.addEdge(e));


graph.draw(context);