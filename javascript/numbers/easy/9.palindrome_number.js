/**
 * @description đảo ngược bằng cách chia lấy dư
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0 || (x % 10 == 0 && x !== 0)) return false
    let reversed = 0
    while (x > reversed) { // lặp cho tới khi x < reversed
      reversed = reversed * 10 + x % 10; // lấy số cuối
      x = Math.floor(x / 10) // giảm đi 1 số ở cuối
    }
    return x === reversed || x === Math.floor(reversed / 10)
};


/**
 * @description chuyển sang string rồi revert rồi so sánh
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    let pal = x.toString().split('').reverse().join('')
    return x == pal
};