import {GraphNode} from "./classes/GraphNode.js";
import {VisibleGraph} from "./classes/VisibleGraph.js";
import {Edge} from "./classes/Edge.js";
import {generateRandomGraph} from './Generators.js'
import {Djikstra, printShortestPathsAndDistances} from "./Djikstra.js";
import {displayDistanceMatrix, getDistanceMatrix} from "./DistanceMatrix.js";
import {getGraphCenter, getMinimaxGraphCenter} from './graphCenter.js'
import {Graph} from "./common.js";
import {getMinimalSpanningTree} from "./minimalSpanningTree.js";

const canvas: HTMLCanvasElement = document.querySelector('canvas')! as HTMLCanvasElement;
// const width = canvas.offsetWidth;
// const height = canvas.offsetHeight;
const context = canvas.getContext('2d')!;
// const node1 = new GraphNode(70, 145);
// const node2 = new GraphNode(410, 85);
const graph = new VisibleGraph();

// 1.
let randomGraph = generateRandomGraph(5);
let nodes = randomGraph.nodes;
let edges = randomGraph.edges;
nodes.forEach((n: GraphNode) => graph.addNode(n));
edges.forEach((e: Edge) => graph.addEdge(e));
graph.draw(context);

// 2.
// let startNode = randomGraph.nodes[0]
let startNode = randomGraph.nodes[Math.floor(Math.random() * graph.nodes.length)];
let djikstraResult = Djikstra(randomGraph, startNode)
printShortestPathsAndDistances(djikstraResult.predecessors, djikstraResult.distances);
// 3.

let distanceMatrix = getDistanceMatrix(randomGraph);
displayDistanceMatrix(nodes, distanceMatrix);

// 4.
let graphCenter = getGraphCenter(nodes, distanceMatrix)
console.log(`center of the graph (node with minimal distance to other nodes): ${graphCenter.id}`);

let minimax = getMinimaxGraphCenter(nodes, distanceMatrix);
console.log(`minimax center: ${minimax.id}`);

// 5.
let spanningTree = getMinimalSpanningTree(randomGraph);
console.log('spanningTree:')
console.log(spanningTree)
let spanningTreeVisibleGraph = new VisibleGraph(spanningTree.nodes, spanningTree.edges);
let spanningTreeCanvas: HTMLCanvasElement = document.querySelector('#minimalSpanningTree')! as HTMLCanvasElement;
spanningTreeVisibleGraph.draw(spanningTreeCanvas.getContext('2d')!);
