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


/**
 * @description clearn hon
 */

var letterCombinations2 = function(digits) {
  if (!digits.length) return []

  const map = {
    '2': ['a','b','c'],
    '3': ['d','e','f'],
    '4': ['g','h','i'],
    '5': ['j','k','l'],
    '6': ['m','n','o'],
    '7': ['p','q','r','s'],
    '8': ['t','u','v'],
    '9': ['w','x','y','z'],
  }

  let result = ['']

  for (const digit of digits) {
    const temp = []
    for (const ch of map[digit]) {
      for (const prev of result) {
        temp.push(prev + ch)
      }
    }
    result = temp
  }

  return result
}


console.log(letterCombinations2('23'))