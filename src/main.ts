import {GraphNode, nodeLabelGenerator} from "./classes/GraphNode.js";
import {VisibleGraph} from "./classes/VisibleGraph.js";
import {Point} from "./classes/Point.js";
import {Edge} from "./classes/Edge.js";
import {generateRandomGraph} from './Generators.js'
import {Graph} from "./common.js";
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


function getKeyOfMinValue(map: Map<GraphNode, number>): GraphNode{
    let keys = map.keys()
    let minKey = keys.next()
    let nextKey;
    do{
        nextKey = keys.next()
        // @ts-ignore
        if(map.get(nextKey.value) < map.get(minKey.value)){
            minKey = nextKey;
        }
    }while(!nextKey);
    return minKey.value;
}

function filterMap(map: Map<GraphNode, number>, filter: (node: GraphNode, distance: number) => boolean){
    let filteredArray = Array.from(map).filter(x => filter(...x));
    let filteredMap = new Map<GraphNode, number>();
    filteredArray.forEach(x => filteredMap.set(x[0], x[1]));
    return filteredMap;
}

function Djikstra2(graph: Graph){
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
        let unvisitedNeighbours: GraphNode[] = currentNode.connectedNodes.filter(node => !finishedNodes.includes(node));
        unvisitedNeighbours.forEach(node => relax(currentNode, node));
    }
    return [distances, predecessors]
}

console.log(randomGraph)
// TODO: write custom stringify and parse function
// console.log(JSON.stringify(randomGraph))

let djikstraResult = Djikstra2(randomGraph)
let distances = djikstraResult[0];
let predecessors = djikstraResult[1];
console.log('distances:')
console.log(distances)
console.log();
console.log('predecessors:')
console.log(predecessors)

// console.log('shortestPathNodes:')
//
// console.log(shortestPathNodes.map(node => node.id))