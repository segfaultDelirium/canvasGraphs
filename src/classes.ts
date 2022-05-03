// import {v4 as uuidv4} from 'uuid';

export class Point{
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    print = () => console.log(`Point: x=${this.x}, y=${this.y}`);
}

// class that holds all visible GraphNodes and Edges
export class Graph{
    nodes: GraphNode[] = [];
    edges: Edge[] = []

    addNode(node: GraphNode){
        if(this.nodes.filter(n => n.id == node.id).length > 0){
            console.warn('trying to add node that already exist in nodes array');
            return;
        }
        this.nodes = [...this.nodes, node];
    }
}

export class Edge{
    startNode: GraphNode;
    endNode: GraphNode;
    weight?: number;
    constructor(startNode: GraphNode, endNode: GraphNode, weight?: number) {
        if(startNode.id == endNode.id){
            throw new Error("startNode should be different from endNode");
        }
        this.startNode = startNode;
        this.endNode = endNode;
        this.weight = weight;
    }

    connectsNodes(node1: GraphNode, node2: GraphNode): boolean{
        return( (this.startNode.id == node1.id
            || this.startNode.id == node2.id)
            && (this.endNode.id == node1.id
                || this.endNode.id == node2.id));
    }
}

// it is assumed that the GraphNode cannot have edge with itself
// and that GraphNode cannot have multiple edges with another GraphNode.
export class GraphNode extends Point{
    // @ts-ignore
    id: string = crypto.randomUUID();
    connectedNodes: GraphNode[] = [];
    edges: Edge[] = []
    constructor(x: number, y: number) {
        super(x, y);
    }

    connect(node: GraphNode){
        this.connectedNodes = [...this.connectedNodes, node];
        node.connectedNodes = [...node.connectedNodes, this];
        this.edges = [...this.edges, new Edge(this, node)];
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