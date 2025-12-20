/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

var findMedianSortedArrays = function(nums1, nums2) {
    let outut = nums1.concat(nums2).sort((a,b) => a-b)
    let middle = Math.floor(outut.length / 2)
    return outut.length % 2 === 0 ? (outut[middle - 1] + outut[middle]) / 2 : outut[middle]
}

var nums1 = [1,3], nums2 = [2]

console.log(findMedianSortedArrays(nums1, nums2))