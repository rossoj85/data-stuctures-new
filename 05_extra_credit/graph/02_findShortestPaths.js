function shortestPaths(graph, start, end) {
  var paths = [[start]];
  var completedPaths = [];
  var shortestPathLength = 0;
  
  while (paths.length > 0) {
    var currentPath = paths.shift();
    
    var lastNode = currentPath[currentPath.length - 1];
    var nextNodes = graph[lastNode];

    // skip if we've already found the shortest path and this is longer
    if (shortestPathLength && currentPath.length === shortestPathLength) {
      continue;
    }    
    
    for (var i=0; i<nextNodes.length; i++) {
      var nextNode = nextNodes[i];
      
      if (hasVisited(currentPath, nextNode)) {
        continue;
      }
      
      var newPath = currentPath.slice();
      newPath.push(nextNode);
      
      if (nextNode === end) {
        completedPaths.push(newPath);
        
        if (shortestPathLength === 0) {
          shortestPathLength = newPath.length;
        }
      } else {
        paths.push(newPath);
      }
    }
  }
  
  return completedPaths;
}

function hasVisited(path, node) {
  for (var i=0; i<path.length; i++) {
    if (node === path[i]) {
      return true;
    }
  }
  
  return false;
}
