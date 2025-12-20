/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let left = 0
    let right = nums.length
    while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        if (nums[mid] === target) return mid
        if (nums[mid] < target) left = mid + 1
        else right = mid - 1
    }
    return right == left ? left + 1 : right + 1
};


console.log(searchInsert([1,2,5], 3))
