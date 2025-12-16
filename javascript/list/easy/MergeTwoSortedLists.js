/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @description sai đề nhưng đúng kết quả
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    let output = []
    let left = 0
    let right = 0
    while (left < list1.length && right < list2.length) {
        if (list1[left] <= list2[right]) {
          output.push(list1[left])
          left++
        }else {
          output.push(list2[right])
          right ++
        }
    }
    return [...output, ...list1.slice(left), ...list2.slice(right)]
};

console.log(mergeTwoLists([6], [1,2,3,4,5]))