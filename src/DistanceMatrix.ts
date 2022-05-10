import {Djikstra} from "./Djikstra.js";
import {GraphNode} from "./classes/GraphNode.js";
import {Graph} from "./common.js";

export function getDistanceMatrix(graph: Graph){
    let distanceMatrix: number[][] = [];
    let sortedNodes = graph.nodes.sort( (a, b) => (a.id > b.id) ? 1 : -1 )
    sortedNodes.forEach( (node) =>{
        let djikstraResult = Djikstra(graph, node)
        let distances = djikstraResult.distances;
        // console.log(distances)
        distanceMatrix.push(Array.from(distances).map(mapElement => mapElement[1]));
    })
    return distanceMatrix;
}

function createElement(tagName: string, innerHtml: string){
    let newElement = document.createElement(tagName);
    newElement.innerHTML = innerHtml;
    return newElement;
}

export function displayDistanceMatrix(nodes: GraphNode[], distanceMatrix: number[][]){
    let sortedNodes = nodes.sort( (a, b) => (a.id > b.id) ? 1 : -1 )
    let thead = document.querySelector('#distanceMatrix thead')!;
    let newTh = document.createElement('th');
    newTh.innerHTML = `\\`;
    thead.appendChild(newTh);
    let tbody = document.querySelector('#distanceMatrix tbody')!;
    for(let i = 0; i < sortedNodes.length; i++){
        thead.appendChild(createElement('th', `${nodes[i].id}`));
        let newTr = createElement('tr', `<td>${nodes[i].id}</td>`)
        distanceMatrix[i].forEach(distance => newTr.innerHTML += `<td>${distance}</td>`);
        newTr.innerHTML += `<td>${distanceMatrix[i].reduce((a, b) => a+b)}</td>`
        tbody.appendChild(newTr);
    }
    thead.appendChild(createElement('th', `sum`));

}