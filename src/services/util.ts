/**
 * Parse the object into a Query form
 * For example, {a: 1} is resolved to? In the form of a = 1
 * @param params
 * @returns
 */
export function parseParam(params: Record<string, any> | undefined): string {
  if (!params) return ''

  let param = ''

  const paramKeys = Object.keys(params)
  if (paramKeys.length > 0) {
    param += '?'

    paramKeys.forEach((key) => {
      const value = params[key]

      param += `${key}=${value}&`
    })

    param = param.slice(0, -1)
  }

  return param
}
