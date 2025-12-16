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

// console.log(lengthOfLongestSubstring('abcabcabc'))


// console.log(towSumTest([11,7,15,2], 9))

/**
 * @description đảo ngược bằng cách chia lấy dư
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x <= 0 || (x % 10 == 0 && x !== 0)) return false
    let reversed = 0
    while (x > reversed) { // lặp cho tới khi x < reversed
      reversed = reversed * 10 + x % 10; // lấy số cuối
      x = Math.floor(x / 10) // giảm đi 1 số ở cuối
    }
    return x === reversed || x === Math.floor(reversed / 10)
};


// console.log(isPalindrome(12311321))

const track = () => {

}

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const map = {
        '2': ['a','b','c'],
        '3': ['d','e','f'],
        '4': ['g','h','i'],
        '5': ['j','k','l'],
        '6': ['m','n','o'],
        '7': ['p','q','r', 's'],
        '8': ['t','u','v'],
        '9': ['w','x','y','z'],
    }
    const list = digits.split('')
    let result = []
    let temp = []
    for (let i = list.length - 1; i >= 0; i--) {
      if (result.length <= 0) result = map[list[i]]
      else {
        for (let j = 0; j < map[list[i]].length; j++) {
          for (let k = 0; k < result.length; k++) {
            temp.push(map[list[i]][j] + result[k])
          }
        }
        result = temp
        temp = []
      }
    }
  return result
};

console.log(letterCombinations('765'))