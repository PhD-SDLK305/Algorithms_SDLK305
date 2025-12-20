const check = (a, b) => {
  let match = '';
  let len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) break;
    match += a[i];
  }
  return match;
};

var longestCommonPrefix = function(strs) {
  if (!strs.length) return '';
  const first = strs[0];
  let curr = first;
  for (let i = 1; i < strs.length; i++) {
    curr = check(curr, strs[i]);
    if (curr === '') return '';
  }

  return curr;
};

/**
 * @description
 */

var longestCommonPrefix2 = function(strs) {
  if (!strs.length) return "";

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      console.log(strs[i].indexOf(prefix))
      prefix = prefix.slice(0, -1); 
      // sau lần 1 sẽ còn flow
      // sau lần 2 slice sẽ còn fl 
      if (prefix === "") return "";
    }
  }

  return prefix;
};


let strs = ["flower","flow","flight"]
console.log(longestCommonPrefix2(strs))