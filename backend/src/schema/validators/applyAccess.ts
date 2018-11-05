import { IQuery, IQueries, IvalidatorFunction } from '../types/interface'

const applyToQuery = (query: IQuery): IQuery => {
  if (typeof query.access !== 'function') {
    throw new Error(`Invalid access level: ${query.access}`)
  }
  return {
    ...query,
    resolve: (parent, args, context, ...rest) => {
      query.access(parent, args, context, ...rest)
      return query.resolve(parent, args, context, ...rest)
    },
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
