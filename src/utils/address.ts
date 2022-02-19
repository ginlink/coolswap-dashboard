import { ZERO_ADDRESS } from '@/constants/misc'
import { isAddress } from '@ethersproject/address'

/**
 * compare two address
 * @param a
 * @param b
 * @returns
 */
export function compareAddress(a: string | undefined, b: string | undefined) {
  if (!a || !b) return false

  //validate
  if (!isAddress(a) || !isAddress(b)) return false

  return a.toLowerCase() === b.toLowerCase()
}

export function compareAddresses(a: string[] | undefined, b: string[] | undefined) {
  if (!a || !b) return false

  const validA = a.filter((x) => !compareAddress(ZERO_ADDRESS, x))
  const validB = b.filter((x) => !compareAddress(ZERO_ADDRESS, x))

  const len1 = validA.length
  const len2 = validB.length

  if (len1 != len2) return false

  const result = true

  for (let i = 0; i < len1; ++i) {
    if (!compareAddress(validA[i], validB[i])) return false
  }

  return result
}
