import {drawNode, drawEdge} from '../drawing.js';
import {Edge} from "./Edge.js";
import {GraphNode} from "./GraphNode.js";

// class that holds all visible GraphNodes and Edges
export class VisibleGraph{
    nodes: GraphNode[] = [];
    edges: Edge[] = []

    constructor(nodes?: GraphNode[], edges?: Edge[]) {
        if(nodes) this.nodes = nodes;
        if(edges) this.edges = edges;
    }
    addNode(node: GraphNode){
        if(this.nodes.filter(n => n.id == node.id).length > 0){
            console.warn('trying to add node that already exist in nodes array');
            return;
        }
        this.nodes = [...this.nodes, node];
    }

    addEdge(edge: Edge){
        if(this.edges.filter(e => e.id == edge.id ).length > 0){
            console.warn('trying to add edge that already exist in nodes array');
            return;
        }
        this.edges = [...this.edges, edge];
    }

    draw(context: CanvasRenderingContext2D){
        // console.log('starting to draw')
        this.nodes.forEach(node => drawNode(context, node));
        this.edges.forEach(edge => drawEdge(context, edge));
        // console.log('finished drawing')
    }
}

