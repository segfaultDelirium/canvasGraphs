// it is assumed that the GraphNode cannot have edge with itself
// and that GraphNode cannot have multiple edges with another GraphNode.
import {Point} from "./Point.js";
import {Edge} from "./Edge.js";

var nodeCounter = String.fromCharCode('A'.charCodeAt(0)-1) // letter before 'A'
export function nodeLabelGenerator(){
    nodeCounter = String.fromCharCode(nodeCounter.charCodeAt(0)+1)
    return nodeCounter;
}

export class GraphNode extends Point{
    // @ts-ignore
    // id: string = crypto.randomUUID();
    id: string = nodeLabelGenerator();
    connectedNodes: GraphNode[] = [];
    edges: Edge[] = []
    constructor(x: number, y: number) {
        super(x, y);
    }

    connect(node: GraphNode, weight?: number){
        this.connectedNodes = [...this.connectedNodes, node];
        node.connectedNodes = [...node.connectedNodes, this];
        const edge = new Edge(this, node, weight)
        this.edges = [...this.edges, edge];
        node.edges = [...node.edges, edge];
        return edge;
    }


    disconnect(node: GraphNode){
        // TODO
        this.connectedNodes = this.connectedNodes.filter( arrayNode => arrayNode !== node);
        node.connectedNodes = node.connectedNodes.filter( arrayNode => arrayNode !== this);
        this.edges = this.edges.filter(edge => !edge.connectsNodes(this, node));
        // if()
        // this.connectedNodes
    }

    getEdgeConnectingNode(node: GraphNode): Edge{
        return this.edges.filter(edge => edge.connectsNodes(this, node))[0]
    }
}