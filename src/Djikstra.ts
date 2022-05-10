import {GraphNode} from "./classes/GraphNode.js";
import {Graph, Path} from "./common.js";

export function Djikstra(graph: Graph, startNode: GraphNode){
    //init start
    let distances: Map<GraphNode, number> = new Map<GraphNode, number>();
    let predecessors: Map<GraphNode, GraphNode | null> = new Map<GraphNode, GraphNode | null>();
    graph.nodes.forEach(node => distances.set(node, Infinity));
    graph.nodes.forEach(node => predecessors.set(node, null));
    //     let startNode = graph.nodes[Math.floor(Math.random() * graph.nodes.length)];
    // let startNode = graph.nodes[0];
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
        let currentNode = graph.nodes.filter(node => !finishedNodes.includes(node))
            .reduce((a, b) => (distances.get(a)! < distances.get(b)!) ? a : b );
        finishedNodes = [...finishedNodes, currentNode];
        currentNode.connectedNodes.filter(node => !finishedNodes.includes(node)).forEach(node => relax(currentNode, node));
    }
    return {distances: distances, predecessors: predecessors}
}

export function getStartNode(predecessors: Map<GraphNode, GraphNode | null>){
    return Array.from(predecessors).filter(x => x[1] == null)[0][0];
}

export function getShortestPathsToNodes(predecessors: Map<GraphNode, GraphNode | null>){
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

export function getPathString(path: GraphNode[]){
    if(path.length == 0) return "";
    let res = "";
    path.slice(0, -1).forEach(node => res += `${node.id} - `);
    res += `${path[path.length-1].id}`
    return res;
}

export function printShortestPathsAndDistances(predecessors: Map<GraphNode, GraphNode | null>, distances: Map<GraphNode, number>){
    let paths = getShortestPathsToNodes(predecessors);
    console.log(`Djikstra algorithm. startNode = ${getStartNode(predecessors).id}`);
    paths.forEach(path =>{
        console.log(`shortest path to node ${path.node.id} of length: ${distances.get(path.node)}`)
        console.log(getPathString(path.path));
    })
}