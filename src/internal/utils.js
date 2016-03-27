const suid = autoInc()

export const sym = (id, hasSuid) => `@@redux-saga/${id}${hasSuid ? suid():''}`

export const TASK  = sym('TASK')
export const kTrue = () => true
export const noop = () => {}
export function ident(v) {
  return v
}

export const isDev = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development'

export function check(value, predicate, error) {
  if(! predicate(value) )
    throw new Error(error)
}

export const is = {
  undef     : v => v === null || v === undefined,
  notUndef  : v => v !== null && v !== undefined,
  string    : v => typeof v === 'string',
  func      : f => typeof f === 'function',
  array     : Array.isArray,
  promise   : p => p && is.func(p.then),
  iterator  : it => it && is.func(it.next) && is.func(it.throw),
  task      : it => it && it[TASK]
}

export function remove(array, item) {
  const index = array.indexOf(item)
  if(index >= 0)
    array.splice(index, 1)
}

export function deferred(props = {}) {
  let def = {...props}
  const promise = new Promise((resolve, reject) => {
    def.resolve = resolve
    def.reject = reject
  })
  def.promise = promise
  return def
}

export function arrayOfDeffered(length) {
  const arr = []
  for (var i = 0; i < length; i++) {
    arr.push(deferred())
  }
  return arr
}

export function autoInc(seed = 0) {
  return () => ++seed
}

export function asap(action) {
  return Promise.resolve(1).then( () => action() )
}

/* eslint-disable no-console */
export function warnDeprecated(msg) {
  if(isDev) {
    console.warn('DEPRECATION WARNING', msg)
  }
}
