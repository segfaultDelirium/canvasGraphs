// it is assumed that the GraphNode cannot have edge with itself
// and that GraphNode cannot have multiple edges with another GraphNode.
import {Point} from "./Point.js";
import {Edge} from "./Edge.js";

export class GraphNode extends Point{
    // @ts-ignore
    id: string = crypto.randomUUID();
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
}