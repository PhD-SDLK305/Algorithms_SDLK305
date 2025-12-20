/**
 * @description ý tưởng thuật toán
 * - palindrome luôn đối xứng quanh 1 tâm
 * - aba thì đối xứng quanh tâm b
 * - abba thì đối xứng quanh tâm bb
 * ==> nếu chẵn thì đối xứng quan tâm l, l + 1 còn ngược lại nếu lẻ đổi xứng quanh 1 tâm l
 * - mở rồng l-- và r++ sang 2 phía lăp nếu l >= 0 && r < s.length và s[l] phải bằng s[r]
 * - r - l + 1 > maxLen:
 *  l = 1 , r = 2 , substr = "bb" => 2 - 1 + 1 = 2
 *  l = 0 , r = 3 , substr = "abba" => 3 - 0 + 1 = 4
 *  nếu > maxLen => r = l ( vì đang đi từ trái qua phải ) sau đó cập nhật lại maxLen
 * @param {string} s
 * @return {string}
 */

var longestPalindrome = function (s) {
  if (s.length < 2) return s // nếu chuỗi có độ dài nhỏ hơn 2 trả về luôn
  let start = 0
  let maxLen = 1
  const process = (l, r) => {
    while (l >= 0 && r < s.length && s[l] == s[r]) {
      if (r - l + 1 > maxLen) {
        start = l
        maxLen = r - l + 1
      }
      l--;
      r++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    process(i, i)
    process(i, i + 1)
  }
  return s.substring(start, start + maxLen)
};

let s = "ac"
console.log(longestPalindrome(s))