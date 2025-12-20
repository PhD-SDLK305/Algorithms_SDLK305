/**
 * @param NestedLoop
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum1 = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) return [i, j]
        }
    }
    return [];
};

/**
 * @param Đệ quy
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum2 = function(nums, target, index = 0, map = {}) {
  if (index > nums.length) return [] // nếu index > độ dài mảng trả về []
  let need = target - nums[index] // công thức target - nums[index] = need cần (nums[index] + need = target)
  if (map.hasOwnProperty(need)) // dùng hasOwnProperty để tìm kiếm dạng {'7': index} nếu 9 - 2 = 7 mà 7 có trong map => trả về index , map[need] = index của 7
    return [map[need], index]
  map[nums[index]] = index // nếu không gán key value dạng [value] : index cho map
  return twoSum2(nums, target, index + 1, map) // thực hiện đệ quy
};


/**
 * @param tối ưu hơn
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum3 = function(nums, target) {
    const map = {}
    for (let i = 0; i < nums.length; i++) {
        let remain = target - nums[i]
        if (map.hasOwnProperty(remain)) {
            return [map[remain], i]
        }
        map[nums[i]] = i
    }
    return []
};



console.log(twoSum3([11,7,2,15], 9))