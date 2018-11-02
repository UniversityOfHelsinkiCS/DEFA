import { IQuery, IUser } from '../types/interface'
import checkLoggedIn from './checkLoggedIn'
import checkPrivileged from './checkPrivileged'

const validators: {
  [key: string]: (user?: IUser) => void
} = {
  public: () => undefined,
  user: checkLoggedIn,
  privileged: checkPrivileged
}

const validateAccess = (accessLevel: string): ((user?: IUser) => void) => validators[accessLevel]

const applyToQuery = (query: IQuery): IQuery => {
  if (!validators[query.access]) {
    throw new Error(`Invalid access level: ${query.access}`)
  }
  return {
    ...query,
    resolve: (parent, args, context, ...rest) => {
      validateAccess(query.access)(context.user)
      return query.resolve(parent, args, context, ...rest)
    },
    access: undefined
  }
}

interface IQueries {
  [key: string]: IQuery
}

const applyToQueryObject = (queries: IQueries): IQueries => Object.keys(queries).reduce(
  (acc: IQueries, key: string): IQueries => ({ ...acc, [key]: applyToQuery(queries[key]) }),
  {}
)

// This function applies a validator function to be run before the resolver.
// If access cannot be granted the validator throws an error and the resolver will not be run.
// All queries must include an access field. Set access to 'public' for no validation.
const applyAccess = (type: {
  queries: IQueries,
  mutations: IQueries
}) => ({
  ...type,
  queries: applyToQueryObject(type.queries),
  mutations: applyToQueryObject(type.mutations)
})

export default applyAccess
