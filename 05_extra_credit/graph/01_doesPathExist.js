
// DOESNT WORK 
//   let exists=false
//   var pathExists = function (graph, start, end) {
//   let currentNode = graph[start]
  
  
//   for (var i =0;i<currentNode.length;i++ ){
//     // console.log(currentNode[i])
//     // console.log(currentNode[i]===end)
//     if(currentNode[i]===end) {exists=true}
//     //if(currentNode[i]===end) {exists=true} WHY DOESNT THIS WORK??
//      pathExists(graph,currentNode[i],end)
//   }
//   return exists
// }

//DOESN'T WORK


//THIS ONE WORKS, NOT ON GRAPHS WITH CYCLES 
// var pathExists = function(graph,start,end){
//   let queue=[start]
//   let currentNode
//   while(queue.length){
//     console.log(queue)
//    currentNode=queue.shift();
//    if(currentNode===end) return true
//    console.log(currentNode)
//    graph[currentNode].forEach((node)=>queue.push(node))
//   }
//   return false
// }


//this was a tought one. First i tried with recursion, but I couln't get it to return
//true when it hit true. Ultimately I implimented a breadth first search. 

var pathExists = function(graph,start,end, visited={}){
  let queue=[start]
  let currentNode
  while(queue.length){

   currentNode=queue.shift();
   if(currentNode===end) return true
  
   graph[currentNode].forEach((node)=>{
     if(!visited[node]){
       queue.push(node)
       visited[currentNode]=true
     }
     
   })
  }
  return false
}