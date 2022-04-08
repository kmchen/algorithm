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

// 128 https://leetcode.com/problems/longest-consecutive-sequence/
// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
// You must write an algorithm that runs in O(n) time.
// 
// Example 1:
// [1,2,3,4,100,200]
// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
//
// Example 2:
// [0, 0, 1, 2, 3, 4, 5, 6, 7, 8]
// Input: nums = [0,3,7,2,5,8,4,6,0,1]
// Output: 9
// 
// Constraints:
// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
//
function longestConsecutiveElements(list) {
  // Convert list to a set
  // Loop through the list and check if the element is a strting point by checking the left node
  // If it's a starting node:
  //  - Check whether it has a right node
  //  - Record the max length
  
  if(list.length === 0) return 0;

  const elemSet = new Set();
  list.forEach((item) => elemSet.add(item));
  
  let maxLength = 1;
  list.forEach((item) => {
    // item is starting node
    if(!elemSet.has(item - 1)) {
      // Loop through the list and check if the element is a strting point by checking the left node
      let startNode = item;
      let tmpLength = 1;
      for(let i = 0; i < elemSet.size; i++) {
        // If item has a right neighbour
        if(elemSet.has(startNode + 1)) {
          tmpLength++;
          startNode = startNode + 1;
        } else {
          break;
        }
      }
      maxLength = tmpLength > maxLength ? tmpLength : maxLength;
    }
  })
  return maxLength
}

console.log("=====longestConsecutiveElements=====")
console.log(longestConsecutiveElements([100,4,200,1,3,2]) === 4)
console.log(longestConsecutiveElements([0, 0, 1, 2, 3, 4, 5, 6, 7, 8]) === 9)
console.log(longestConsecutiveElements([]) === 0)

// Two sum II https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
// Tag: array, two pointers, binary search
// Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.
//
//  Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.
//
//  The tests are generated such that there is exactly one solution. You may not use the same element twice.
//
//  Your solution must use only constant extra space.
//  Example 1:
//  Input: numbers = [2,7,11,15], target = 9
//  Output: [1,2]
//  Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
//
//  Example 2:
//  Input: numbers = [2,3,4], target = 6
//  Output: [1,3]
//  Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].
//
//  Example 3:
//  Input: numbers = [-1,0], target = -1
//  Output: [1,2]
//  Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].

function twoSumII(list, target) {
  // Loop through the list
  // For each element:
  //  - Loop the rest of the array and find the number adds up to the target
  //  - If the addition is greater than target, break;
  //  Problem: O(n^2), too long
  //  Hint: Since it's already sorted, two pointers
  let pt1 = 0;
  let pt2 = list.length-1;
  
  for(;pt1 <= pt2;) {
    if(list[pt1] + list[pt2] === target) {
      return [pt1+1, pt2+1];
    }
    if(list[pt1] + list[pt2] > target) {
      pt2--
    }
    if(list[pt1] + list[pt2] < target) {
      pt1++
    }
  }
}

console.log(twoSumII([2,7,11,15], 9), [1, 2])
console.log(twoSumII([2,3,4], 6), [1, 3])
console.log(twoSumII([-1,0], -1), [1, 2])
