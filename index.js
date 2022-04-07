// Array https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/
//Given an array arr, replace every element in that array with the greatest element among the elements to its right, and replace the last element with -1.
//  After doing so, return the array.
//  Example 1:
//
//Input: arr = [17,18,5,4,6,1]
//Output: [18,6,6,6,1,-1]
//Explanation: 
//- index 0 --> the greatest element to the right of index 0 is index 1 (18).
//  - index 1 --> the greatest element to the right of index 1 is index 4 (6).
//  - index 2 --> the greatest element to the right of index 2 is index 4 (6).
//  - index 3 --> the greatest element to the right of index 3 is index 4 (6).
//  - index 4 --> the greatest element to the right of index 4 is index 5 (1).
//  - index 5 --> there are no elements to the right of index 5, so we put -1.
//  Example 2:
//
//Input: arr = [400]
//Output: [-1]
//Explanation: There are no elements to the right of index 0.
//   
//
//  Constraints:
//
//1 <= arr.length <= 104
//1 <= arr[i] <= 105

function replaceElementToTheRight(array) { 
  let maxNumArr = new Array(array.length);
  for(let i = array.length-1; i >= 0; i--) {
    maxNumArr[i] = (i === array.length - 1) ? array[i] : Math.max(array[i], maxNumArr[i+1]);
  }

  for(let i = 0; i < array.length; i++) {
    array[i] = (i === array.length - 1) ? -1 : maxNumArr[i+1];
  }

  return array;
}

console.log(replaceElementToTheRight([17,18,5,4,6,1]));

// Graph DFS BFS https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/
//There are n cities numbered from 0 to n - 1 and n - 1 roads such that there is only one way to travel between two different cities (this network form a tree). Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.
//
//  Roads are represented by connections where connections[i] = [ai, bi] represents a road from city ai to city bi.
//
//  This year, there will be a big event in the capital (city 0), and many people want to travel to this city.
//
//  Your task consists of reorienting some roads such that each city can visit the city 0. Return the minimum number of edges changed.
//
//  It's guaranteed that each city can reach city 0 after reorder.
//
//  Example 1:
//
//Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
//Output: 3
//Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
//  Example 2:
//
//
//Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
//Output: 2
//Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
//  Example 3:
//
//Input: n = 3, connections = [[1,0],[2,0]]
//Output: 0
// 
//
//Constraints:
//
//2 <= n <= 5 * 104
//connections.length == n - 1
//connections[i].length == 2
//0 <= ai, bi <= n - 1
//ai != bi
//
// Is there a loop?
// Is it a connected graph?
//
function minOrder(n, list) {
  let edges = {};
  for(let i = 0; i < n; i++) {
    edges[i] = []
  }
  list.forEach(([src, dest]) => edges[src].push(dest));
  let neighbours = {};
  for(let i = 0; i < n; i++) {
    neighbours[i] = []
  }
  list.forEach(([src, dest]) => {
      neighbours[src].push(dest)
      neighbours[dest].push(src)
  });
  let visited = [];
  let changes = 0;

  function dfs(node) {
    neighbours[node].forEach((neighbour) => {
      if(visited.includes(neighbour)) return;
      if(edges[node].includes(neighbour)) {
        changes++; 
      }
      visited.push(neighbour);
      dfs(neighbour);
    });
  }
  visited.push(0);
  dfs(0)
  return changes;
}
console.log(minOrder(6, [[0,1],[1,3],[2,3],[4,0],[4,5]]) === 3)
console.log(minOrder(5, [[1,0],[1,2],[3,2],[3,4]]) === 2)
console.log(minOrder(3, [[1,0],[2,0]]) === 0)
