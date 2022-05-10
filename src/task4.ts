export function getGraphCenter(nodes: GraphNode[], distanceMatrix: number[][]){
    let sortedNodes = nodes.sort( (a, b) => (a.id > b.id) ? 1 : -1 )
    debugger;
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