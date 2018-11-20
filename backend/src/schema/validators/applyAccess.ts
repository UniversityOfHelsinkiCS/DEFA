import { IQuery, IQueries, IvalidatorFunction, Iresolve } from '../types/interface'

// This abomination is necessary to find out whether a validator function returns undefined or a Promise<undefined>.
const isAsync = (func: IvalidatorFunction): boolean => {
  let returnValue: Promise<void> | void
  try {
    returnValue = func(null, {})
  } catch (e) {
    return false
  }
  if (returnValue) {
    const promise = returnValue as Promise<void>
    promise.catch((error: Error) => undefined)
    return true
  } else {
    return false
  }
}

export const validateResolver = (resolver: Iresolve, validator: IvalidatorFunction): Iresolve => {
  const validatorIsAsync = isAsync(validator)
  return validatorIsAsync ? (
    async (parent, args, context, ...rest) => {
      const promise: Promise<void> = validator(parent, args, context, ...rest) as Promise<void>
      // Throws the error instead of causing a promise rejection.
      promise.catch((error: Error) => { throw error })
      await promise
      return resolver(parent, args, context, ...rest)
    }
  ) : (
    (parent, args, context, ...rest) => {
      validator(parent, args, context, ...rest)
      return resolver(parent, args, context, ...rest)
    }
  )
}

const applyToQuery = (query: IQuery): IQuery => {
  if (typeof query.access !== 'function') {
    throw new Error(`Invalid access level: ${query.access}`)
  }
  return {
    ...query,
    resolve: validateResolver(query.resolve, query.access),
    access: undefined
  }
}

const applyToQueryObject = (queries: IQueries): IQueries => Object.keys(queries).reduce(
  (acc: IQueries, key: string): IQueries => ({ ...acc, [key]: applyToQuery(queries[key]) }),
  {}
)

// This function applies a validator function to be run before the resolver.
// If access cannot be granted the validator throws an error and the resolver will not be run.
// All queries must include an access field. Use validator publicAccess for no validation.
/* Usage example:
const pubQuery = {
  type: ...,
  args: ...,
  resolve: ...,
  access: publicAccess
}

export const Type = applyAccess({
  queries: {
    queryName: pubQuery
  },
  mutations: {}
})
*/
const applyAccess = (type: {
  queries: IQueries,
  mutations: IQueries
}) => ({
  ...type,
  queries: applyToQueryObject(type.queries),
  mutations: applyToQueryObject(type.mutations)
})

export default applyAccess
