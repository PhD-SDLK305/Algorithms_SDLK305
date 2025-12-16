/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let set = new Set()
  let left = 0;
  let maxLen = 0;
  for (let right = 0; right < s.length; right ++) {
    while(set.has(s[right])) { // lặp nếu set chứa s[right]
      set.delete(s[left])
      left++
    }
    set.add(s[right])
    console.log(set)
    maxLen = Math.max(maxLen, right - left + 1)
  }
  return maxLen
};



/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTOP1 = function (s) {
    let max = 0;
    let subString = '';
    for (let c of s) {
        if (subString.includes(c)) {
            subString = subString.substring(subString.indexOf(c)+1);
        }
        subString += c;
        max = Math.max(max, subString.length);
    }
    return max;
};

let s = "abcabcdabc"
console.log(lengthOfLongestSubstring(s))
console.log(lengthOfLongestSubstringTOP1(s))