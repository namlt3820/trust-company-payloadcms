import _ from 'lodash'

export const isArrayString = (arr) => {
  return _.isArray(arr) && _.every(arr, (element) => _.isString(element))
}
