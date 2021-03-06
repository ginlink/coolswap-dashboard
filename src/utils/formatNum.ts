import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

/**
 * 将传入数字转化为指定保留小数的值，如果传入数字大于一百万，则自动换算单位
 * @param num 待转化数值
 * @param wei 保留小数点位数
 * @returns 转化结果，字符串
 */
export function computeNumUnit(num: BigNumber | ethers.BigNumber | string | number | undefined | null, wei = 2) {
  // 所有数据统一用bignumber计算，中间量用string，避免number的错误

  if (num === undefined || num === null || num === '' || isNaN(num as number)) return '-'
  if (typeof num == 'string' && num.match(/[^\d\.e-]/g)) return '-' // 如果有除数字、小数点和科学计数法外的其他字符
  if (num < 0) return '-' // 不处理负数情况，认为负数为-
  // 边界条件
  let bigNum: BigNumber

  if (num instanceof ethers.BigNumber) bigNum = new BigNumber(num.toString())
  else if (num instanceof BigNumber) bigNum = num
  else bigNum = new BigNumber(num)
  // BigNumber为BN.js库，不支持小数
  // BigFloatNumber为bignumber.js库，支持小数，所以统一用它来处理数据

  // console.log('[num]:', num, bigNum.toFixed())

  const baseK = new BigNumber('1000')
  const baseM = new BigNumber('1000000')
  const baseB = new BigNumber('1000000000')
  const baseT = new BigNumber('1000000000000')

  const numLen = bigNum.toFixed(0).toString().length
  let res = new BigNumber(bigNum)
  let unit = ''

  // 经过分割处理
  if (numLen > 3 && numLen <= 6) {
    res = bigNum.div(baseK)
    unit = 'K'
  } else if (numLen > 6 && numLen <= 9) {
    res = bigNum.div(baseM)
    unit = 'M'
  } else if (numLen > 9 && numLen <= 12) {
    res = bigNum.div(baseB)
    unit = 'B'
  } else if (numLen > 12) {
    res = bigNum.div(baseT)
    unit = 'T'
  }

  // 默认BigFloatNumber的toFix为四舍五入
  return res.toFormat(wei) + unit
}

export function computeNumWei(num: any, wei: number): string {
  num = num == null ? 0 : num

  return num.toFixed(wei)
}

// export function computeNumDiv(num: number | string) {
//   if (typeof num == 'string') num = Number(num)

//   return num.toLocaleString()
//   有弊端，1.00转化后为1，期望1.00
// }

export function computeNumUnitAdapter(
  num: BigNumber | ethers.BigNumber | string | number | undefined | null,
  wei = 2
): string {
  const old = computeNumUnit(num, wei)

  const oldNum = Number(old)
  const inputNum = Number(num)

  if (isNaN(oldNum) || oldNum > 0 || inputNum == 0) {
    return old
  } else {
    return computeNumUnitAdapter(num, wei + 2)
  }
}
