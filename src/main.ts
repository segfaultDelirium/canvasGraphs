import {GraphNode, nodeLabelGenerator} from "./classes/GraphNode.js";
import {VisibleGraph} from "./classes/VisibleGraph.js";
import {Point} from "./classes/Point.js";
import {Edge} from "./classes/Edge.js";
import {generateRandomGraph} from './Generators.js'
import {Graph, Path} from "./common.js";

const canvas: HTMLCanvasElement = document.querySelector('canvas')! as HTMLCanvasElement;
const width = canvas.offsetWidth;
const height = canvas.offsetHeight;


const context = canvas.getContext('2d')!;

// const node1 = new GraphNode(70, 145);
// const node2 = new GraphNode(410, 85);

const graph = new VisibleGraph();

let randomGraph = generateRandomGraph(5);
let nodes = randomGraph.nodes;
let edges = randomGraph.edges;
nodes.forEach((n: GraphNode) => graph.addNode(n));
edges.forEach((e: Edge) => graph.addEdge(e));

graph.draw(context);

function Djikstra(graph: Graph){
    //init start
    let distances: Map<GraphNode, number> = new Map<GraphNode, number>();
    let predecessors: Map<GraphNode, GraphNode | null> = new Map<GraphNode, GraphNode | null>();
    graph.nodes.forEach(node => distances.set(node, Infinity));
    graph.nodes.forEach(node => predecessors.set(node, null));
    //     let startNode = graph.nodes[Math.floor(Math.random() * graph.nodes.length)];
    let startNode = graph.nodes[0];
    distances.set(startNode, 0);
    // init end
    function relax(currentNode: GraphNode, unvisitedNode: GraphNode){
        let edge = currentNode.getEdgeConnectingNode(unvisitedNode);
        let distance = distances.get(currentNode)! + edge.weight!;
        if(distances.get(unvisitedNode)! > distance){
            distances.set(unvisitedNode, distance);
            predecessors.set(unvisitedNode, currentNode);
        }
    }
    let finishedNodes: GraphNode[] = [];
    while(finishedNodes.length != graph.nodes.length){
        let currentNode = nodes.filter(node => !finishedNodes.includes(node))
            .reduce((a, b) => (distances.get(a)! < distances.get(b)!) ? a : b );
        finishedNodes = [...finishedNodes, currentNode];
        currentNode.connectedNodes.filter(node => !finishedNodes.includes(node)).forEach(node => relax(currentNode, node));
    }
    return {distances: distances, predecessors: predecessors}
}



function getStartNode(predecessors: Map<GraphNode, GraphNode | null>){
    return Array.from(predecessors).filter(x => x[1] == null)[0][0];
}

function getShortestPathsToNodes(predecessors: Map<GraphNode, GraphNode | null>){
    function getShortestPathsToNode(node: GraphNode, predecessors: Map<GraphNode, GraphNode | null>){
        let path: GraphNode[] = [];
        let currentNode = node;
        do{
            path.push(currentNode);
            currentNode = predecessors.get(currentNode)!;
        }while(currentNode != null);
        path = path.reverse()
        return {node: node, path: path};
    }
    let paths = Array.from(predecessors).map(mapElement => getShortestPathsToNode(mapElement[0], predecessors))
    return paths;
}

console.log(randomGraph)
// TODO: write custom stringify and parse function
// console.log(JSON.stringify(randomGraph))

let djikstraResult = Djikstra(randomGraph)
let distances = djikstraResult.distances
let predecessors = djikstraResult.predecessors;
console.log('distances:')
console.log(distances)
console.log();
console.log('predecessors:')
console.log(predecessors)

let paths = getShortestPathsToNodes(predecessors);


function getPathString(path: GraphNode[]){
    if(path.length == 0) return "";
    let res = "";
    path.slice(0, -1).forEach(node => res += `${node.id} - `);
    res += `${path[path.length-1].id}`
    return res;
}
console.log(`Djikstra algorithm. startNode = ${getStartNode(predecessors).id}`);
paths.forEach(path =>{
    console.log(`shortest path to node ${path.node.id}: `)
    console.log(getPathString(path.path));
})
