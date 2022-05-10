import {GraphNode} from "./classes/GraphNode.js";

export function getGraphCenter(nodes: GraphNode[], distanceMatrix: number[][]){
    let sortedNodes = nodes.sort( (a, b) => (a.id > b.id) ? 1 : -1 );
    let rowIndex = 0;
    let rowDistanceSum = distanceMatrix[0].reduce( (a, b) => a+b);
    for(let i = 0; i < distanceMatrix.length; i++){
        let newRowDistanceSum = distanceMatrix[i].reduce( (a, b) => a+b);
        if(newRowDistanceSum < rowDistanceSum){
            rowIndex = i;
            rowDistanceSum = newRowDistanceSum;
        }
    }
    return sortedNodes[rowIndex];
}

export function getMinimaxGraphCenter(nodes: GraphNode[], distanceMatrix: number[][]){
    let sortedNodes = nodes.sort( (a, b) => (a.id > b.id) ? 1 : -1 );
    let rowIndex = 0;
    let minimax = 999;
    for(let i = 0; i < distanceMatrix.length; i++){
        let currentMinimax = Math.max(...distanceMatrix[i]);
        if(currentMinimax < minimax){
            rowIndex = i;
            minimax = currentMinimax;
        }
    }
    return sortedNodes[rowIndex];
}
