import {GraphNode} from "./classes/GraphNode.js";
import {Edge} from "./classes/Edge.js";

export type Graph = {
    nodes: GraphNode[]
    edges: Edge[]
}

export type Path = {
    node: GraphNode,
    path: GraphNode[]
}