/**
 * @des ý tưởng nếu trước > sau lấy sau - trước và cộng thêm i lên 1 để tránh + lại số sau
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
  const map = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  };

  let sum = 0;

  for (let i = 0; i < s.length; i++) {
    const curr = map[s[i]];
    const next = map[s[i + 1]];

    if (next > curr) {
      sum += next - curr;
      i++;
    } else {
      sum += curr;
    }
  }

  return sum;
};

console.log(romanToInt('XIV'))