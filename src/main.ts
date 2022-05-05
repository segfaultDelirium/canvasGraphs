import {GraphNode} from "./classes/GraphNode.js";
import {VisibleGraph} from "./classes/VisibleGraph.js";
import {Point} from "./classes/Point.js";
import {Edge} from "./classes/Edge.js";
import {generateRandomGraph} from './Generators.js'
import {Graph} from "./common.js";
const canvas: HTMLCanvasElement = document.querySelector('canvas')! as HTMLCanvasElement;
const width = canvas.offsetWidth;
const height = canvas.offsetHeight;


const context = canvas.getContext('2d')!;

const node1 = new GraphNode(70, 145);
const node2 = new GraphNode(410, 85);

const graph = new VisibleGraph();

let randomGraph = generateRandomGraph(4);
let nodes = randomGraph.nodes;
let edges = randomGraph.edges;
nodes.forEach((n: GraphNode) => graph.addNode(n));
edges.forEach((e: Edge) => graph.addEdge(e));


function Djikstra(graph: Graph){

}

Djikstra(randomGraph)

graph.draw(context);