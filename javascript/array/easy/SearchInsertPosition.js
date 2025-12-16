/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    if (target > nums[nums.length - 1]) return nums.length
    if (target < nums[0] || target == nums[0]) return 0
    let left = 0
    let right = nums.length
    while (left <= right) {
        let middle = Math.floor((left + right) / 2)
        if (nums[middle] == target) return middle
        if (nums[middle] < target) {
            left = middle + 1
        }else right = middle - 1
    }
    return right == left ? left + 1 : right + 1
};

console.log(searchInsert([1,2,5], 3))