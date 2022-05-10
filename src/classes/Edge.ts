import {Point} from "./Point.js";
import {NODE_RADIUS} from "../drawing.js";
import {GraphNode} from "./GraphNode.js";


export class Edge{
    // @ts-ignore
    id: string = crypto.randomUUID();
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

    static getStartPoint(p1: Point, p2: Point){
        const degree = Math.atan((p2.x - p1.x)/(p2.y - p1.y));
        let x = p1.x + ((p2.x > p1.x) ? 1: -1 ) * NODE_RADIUS * Math.abs(Math.sin(-degree));
        let y = p1.y + ((p2.y > p1.y) ? 1 : -1) * NODE_RADIUS * Math.abs(Math.cos(degree));
        return new Point(x, y);
    }
    getStartPoint(){
        return Edge.getStartPoint(this.startNode, this.endNode)
    }
    getEndPoint(){
        return Edge.getStartPoint(this.endNode, this.startNode);
    }

    getOtherEnd(node: GraphNode){
        if(node.id == this.startNode.id)return this.endNode;
        else if(node.id == this.endNode.id) return this.startNode
        else throw new Error(`the given node of id ${node.id} is not part of this edge`);
    }
}