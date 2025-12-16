/**
 * @description LIFO vao sau ra truoc, } se lay dau { gan nhat
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if (s.length % 2) {
    return false;
  }
  const stack = []
  const map = {
    ')': '(',
    ']': '[',
    '}': '{'
  }

  for (const c of s) {
    if (c === '(' || c === '[' || c === '{') {
      stack.push(c)
    } else {
      if (stack.pop() !== map[c]) return false
    }
  }

  return stack.length === 0
}


console.log(isValid("["))