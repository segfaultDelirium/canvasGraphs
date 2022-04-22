"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var canvas = document.querySelector('canvas');
// const width = canvas.offsetWidth;
// const height = canvas.offsetHeight;
var NODE_RADIUS = 30;
var context = canvas.getContext('2d');
var Point = /** @class */ (function () {
    function Point(x, y) {
        var _this = this;
        this.print = function () { return console.log("Point: x=" + _this.x + ", y=" + _this.y); };
        this.x = x;
        this.y = y;
    }
    return Point;
}());
function drawNode(context, p) {
    context.moveTo(p.x + NODE_RADIUS, p.y);
    context.fillStyle = '777777';
    context.strokeStyle = '333333';
    context.arc(p.x, p.y, NODE_RADIUS, 0, 360, false);
    context.stroke();
}
function getEdgeStart(p1, p2) {
    var degree = Math.atan((p2.x - p1.x) / (p2.y - p1.y));
    return new Point(p1.x + ((p2.x > p1.x) ? -1 : 1) * NODE_RADIUS * Math.sin(degree), p1.y + ((p2.y > p1.y) ? 1 : -1) * NODE_RADIUS * Math.cos(degree));
}
var getEdgeEnd = function (p1, p2) { return getEdgeStart(p2, p1); };
function drawEdge(context, p1, p2) {
    var lineStart = getEdgeStart(p1, p2);
    var lineEnd = getEdgeEnd(p1, p2);
    context.moveTo(lineStart.x, lineStart.y);
    context.lineTo(lineEnd.x, lineEnd.y);
    context.stroke();
}
var p1 = new Point(70, 145);
var p2 = new Point(410, 85);
drawNode(context, p1);
drawNode(context, p2);
drawEdge(context, p1, p2);
var p3 = new Point(183, 521);
drawNode(context, p3);
drawEdge(context, p3, p2);
function generateNodeInCircleOuter(startingAmount) {
    var bigCircleRadius = 140;
    var bigCircleMiddle = new Point(300, 300);
    var degreeDiff = Math.PI / 180 * 360 / startingAmount;
    function generateNodeInCircle(nodesGenerated, amountLeft, degree) {
        if (nodesGenerated === void 0) { nodesGenerated = []; }
        if (amountLeft === void 0) { amountLeft = startingAmount; }
        if (degree === void 0) { degree = 0; }
        if (amountLeft == 0)
            return nodesGenerated;
        var newNode = new Point(bigCircleMiddle.x + Math.cos(degree) * bigCircleRadius, bigCircleMiddle.y + Math.sin(degree) * bigCircleRadius);
        return generateNodeInCircle(__spreadArrays(nodesGenerated, [newNode]), amountLeft - 1, degree + degreeDiff);
    }
    return generateNodeInCircle();
}
function drawNodesInCircle(context, amount) {
    generateNodeInCircleOuter(amount).forEach(function (node) { return drawNode(context, node); });
}
drawNodesInCircle(context, 8);
