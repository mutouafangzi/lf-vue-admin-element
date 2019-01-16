/**
 * Created by lifang01
 * 2018/6/26.
 */
// 两个数组是否相等
function equals (arr1, arr2) {
  if (!arr1 || !arr2)
    return false
  if (arr2.length !== arr1.length)
    return false
  for (var i = 0, l = this.length; i < l; i++) {
    if (arr2[i] instanceof Array && arr1[i] instanceof Array) {
      if (!arr2[i].equals(arr1[i]))
        return false
    } else if (arr2[i] !== arr1[i]) {
      return false
    }
  }
  return true
}

export default {equals}
