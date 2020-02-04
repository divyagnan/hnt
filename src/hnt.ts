export function hnt(array: any[] | null, path: string, fallback: any) {
  // if the initial "array" value is null then immediately return the fallback
  if (array === null) return fallback
  // split the full access path into useable parts
  // regex for spliting based on . and []
  const re = /\.|(\[\d+?])/g
  // use the regex to split the path string
  // filter to get 'rid' of undefined values
  const tokens = path.split(re).filter(t => t)
  // return the data - if the data is undefined return the fallback
  return conditional(access(array, tokens), fallback)
}

function access(arr: any[], tokens: any[]): any {
  // if there are no more tokens to access then the full path access is done so the value can be returned
  // or if the value is currently undefiend we won't be able to access anything on it, so we need to return the value
  if (tokens.length === 0 || isUndef(arr)) {
    return arr
  }
  // get the first token for later use
  const token = tokens[0]
  // if the token has brackets then we need to handle it differently
  if (hasBrackets(token)) {
    // we will need to first strip the brackets and then parse the int before passing it to the array
    return access(arr[parseInt(stripBrackets(token), 10)], tokens.slice(1))
  } else {
    // if the string didn't have brackets we can pass it on without special treatment
    return access(arr[token], tokens.slice(1))
  }
}

export function hasBrackets(str: string): boolean {
  // regex to check if the string has []
  const re = /^\[|\]/
  // if the match returns null if the string has no []
  return str.match(re) !== null
}

export function stripBrackets(str: string): string {
  // return the string excluding the first and last characters (the brackets)
  return str.substring(1, str.length - 1)
}

function isUndef(val: any): boolean {
  return typeof val === "undefined"
}

function conditional(val: any, fallback: any) {
  return isUndef(val) ? fallback : val
}
