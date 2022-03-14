import { filter } from 'lodash'

export type Order = 'asc' | 'desc'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export function applySortFilter(
  array: any[] | undefined,
  comparator?: (a: any, b: any) => any,
  query?: any,
  queryFiled?: string
) {
  if (!array || array.length <= 0) {
    return
  }

  const stabilizedThis = array.map((el, index) => [el, index])

  if (comparator) {
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
  }
  if (query) {
    if (queryFiled) {
      return filter(array, (_user) => {
        const value = _user[queryFiled]

        return value?.toLowerCase().indexOf(query.toLowerCase()) !== -1
      })
    }

    return filter(array, (_user) => {
      const keys = Object.keys(_user)

      for (let i = 0; i < keys.length; ++i) {
        const value = _user[keys[i]]

        if (String(value)?.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
          return true
        }
      }
      return false
    })
  }

  return stabilizedThis.map((el) => el[0])
}
