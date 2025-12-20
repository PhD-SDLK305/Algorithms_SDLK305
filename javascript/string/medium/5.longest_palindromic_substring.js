/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if (s.length == 1 || s == (s.split('').reverse()).join('')) return s
  let output = ""
  let left = 0
  for (left; left < s.length;) {
    let right = left + 1
    temp = s[left]
    while(s[left] != s[right] && left < s.length && right < s.length) {
      temp += s[right]
      right++
    }
    temp += s[right] ? s[right] : ''
    if (temp.length > output.length && temp == (temp.split('').reverse()).join('')) output = temp
    left++
  }
  return output[0] !== output[output.length - 1] ? output[0] : output
};

let s = "abbcccba"
console.log(longestPalindrome(s))