/**
 * @param tối ưu hơn
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var towSumTest = function(nums, target) {
    const map = {}
    for (let i = 0; i < nums.length; i++) {
      let need = target - nums[i]
      if (map.hasOwnProperty(need)) return [map[need], i]
      map[nums[i]] = i
    }
    return []
};


/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let set = new Set()
  let left = 0
  let maxLen = 0
  for (let right = 0; right < s.length; right++) {
    while(set.has(s[right])) {
      set.delete(s[left])
      left++
    }
    set.add(s[right])
    maxLen = Math.max(maxLen, right - left + 1 )
  }
  return maxLen
};

console.log(lengthOfLongestSubstring('abcabcabc'))


// console.log(towSumTest([11,7,15,2], 9))