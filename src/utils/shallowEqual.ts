import { shallowEqual } from 'react-redux'

export function shallowEqualArr<T>(left: T[] | undefined, right: T[] | undefined): boolean {
  if (!left || !right) return false
  if (left.length != right.length) return false

  for (let i = 0; i < left.length; ++i) {
    if (!shallowEqual(left[i], right[i])) return false
  }

  return true
}

export function deepEqual(
  left: Record<any, any> | undefined | null,
  right: Record<any, any> | undefined | null,
  depth = 0
): boolean {
  let currentDepth = 0
  let res = true

  function rec(left: Record<any, any> | undefined | null, right: Record<any, any> | undefined | null, depth = 0) {
    currentDepth++
    if (depth != 0 && currentDepth > depth) return res

    if (left === right) return (res = true)

    if (!left || !right) return (res = false)

    const keys1 = Object.keys(left)
    const keys2 = Object.keys(right)
    const len1 = keys1.length
    const len2 = keys2.length

    const shallowRes = shallowEqual(left, right)
    if (shallowRes) return (res = true)

    if (len1 === 0 && len2 === 0) return (res = true)
    if (len1 !== len2) return (res = false)

    for (let i = 0; i < len1; ++i) {
      const key = keys1[i]

      const value1 = left[key]
      const value2 = right[key]

      if (!value1 || !value2) return (res = false)

      if (typeof value1 !== 'object') {
        res = value1 === value2
      }

      if (value1 instanceof Array) {
        res = shallowEqualArr(value1, value2)
      }

      if (isType(value1, 'object')) {
        if (!rec(value1, value2, depth)) return (res = false)

        res = true
      }
    }

    return res
  }

  rec(left, right, depth)

  return res
}

export function isType(value: any, target: string): boolean {
  if (value === undefined) return 'undefined' == target

  return Object.prototype.toString.apply(value).split(' ')[1].slice(0, -1).toLowerCase() == target
}
