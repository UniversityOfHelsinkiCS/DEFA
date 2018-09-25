import schema, { queryReducer } from '../../src/schema/schema'
import * as types from '../../src/schema/types'

describe('GraphQL schema', () => {
  it('includes all queries.', () => {
    expect(
      Object.keys(schema.getQueryType().getFields())
    ).toMatchObject(
      Object.keys(Object.values(types).reduce(
        queryReducer('queries'),
        {}
      ))
    )
  })

  it('includes all mutations.', () => {
    expect(
      Object.keys(schema.getMutationType().getFields())
    ).toMatchObject(
      Object.keys(Object.values(types).reduce(
        queryReducer('mutations'),
        {}
      ))
    )
  })
})
