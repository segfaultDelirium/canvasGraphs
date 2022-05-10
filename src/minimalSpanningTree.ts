import {Graph} from "./common";
import {Edge} from "./classes/Edge";

export function getMinimalSpanningTree(graph: Graph){
    let spanningTree: Graph = {nodes: [], edges: []};
    let startNode = graph.nodes[Math.floor(Math.random() * graph.nodes.length)];
    spanningTree.nodes.push(startNode);

    while(spanningTree.nodes.length != graph.nodes.length){
        let availableEdges = spanningTree.nodes.map(node => node.edges).flat()
            .filter(edge => !spanningTree.nodes.includes(edge.startNode) || !spanningTree.nodes.includes(edge.endNode));
        let leastWeightEdge = availableEdges.reduce( (e1, e2) => (e1.weight! < e2.weight!) ? e1 : e2);
        spanningTree.edges.push(leastWeightEdge);

        function getNodeToPush(spanningTree: Graph, leastWeightEdge: Edge){
            let isStartNode = spanningTree.nodes.includes(leastWeightEdge.startNode);
            let isEndNode = spanningTree.nodes.includes(leastWeightEdge.endNode);
            if(isStartNode) return leastWeightEdge.endNode;
            if(isEndNode) return leastWeightEdge.startNode;
            throw new Error(`the edge is not part of spanning tree`);
        }
        let nodeToPush = getNodeToPush(spanningTree, leastWeightEdge);
        spanningTree.nodes.push(nodeToPush);

    }
    return spanningTree;
}