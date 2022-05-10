import {GraphNode, nodeLabelGenerator} from "./classes/GraphNode.js";
import {VisibleGraph} from "./classes/VisibleGraph.js";
import {Point} from "./classes/Point.js";
import {Edge} from "./classes/Edge.js";
import {generateRandomGraph} from './Generators.js'
import {Djikstra, getShortestPathsToNodes, getStartNode, printShortestPathsAndDistances} from "./Djikstra.js";
import {displayDistanceMatrix, getDistanceMatrix} from "./DistanceMatrix.js";
import {getGraphCenter} from './task4.js'

const canvas: HTMLCanvasElement = document.querySelector('canvas')! as HTMLCanvasElement;
const width = canvas.offsetWidth;
const height = canvas.offsetHeight;
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
let startNode = randomGraph.nodes[0]
// let startNode = randomGraph.nodes[Math.floor(Math.random() * graph.nodes.length)];
let djikstraResult = Djikstra(randomGraph, startNode)
let distances = djikstraResult.distances
let predecessors = djikstraResult.predecessors;
printShortestPathsAndDistances(predecessors, distances);
// 3.

let distanceMatrix = getDistanceMatrix(randomGraph);


displayDistanceMatrix(nodes, distanceMatrix);


let graphCenter = getGraphCenter(nodes, distanceMatrix)
console.log(`center of the graph (node with minimal distance to other nodes): ${graphCenter.id}`);

