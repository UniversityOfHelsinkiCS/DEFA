# GraphQL User Validators

## Validator functions

GraphQL entrypoints can be protected by providing each query with a validator function in an `access` field. This validator function will always be executed before the resolver.

Example:
```
const someQuery: IQuery = {
  type,
  args: {},
  resolve: ... ,
  access: userAccess
}
```

A validator must be provided to every entrypoint. Valid validator functions can be found under the `src/schema/validators` folder.

## applyAccess function

The validator functions can be applied to the entrypoints by exporting the type wrapped in the `applyAccess` function.

Example:
```
import applyAccess from 'src/schema/validators'

...

export default applyAccess({
  queries: {
    ...
  },
  mutations: {
    ...
  }
})
```

## Non-entrypoint nodes

Validators can be applied to a resolver with the `validateResolver` function.

Example:
```
import { validateResolver, userAccess } from 'src/schema/validators'

const safeResolver = validateResolver(resolver, userAccess)
```
