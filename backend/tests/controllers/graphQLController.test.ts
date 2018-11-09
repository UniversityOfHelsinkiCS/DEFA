import { options } from '../../src/controllers/graphQLController'

const opt = options as unknown as {
  graphiql?: boolean,
  // tslint:disable-next-line:no-any
  context?: any
}

describe('GraphQLController', () => {
  it('does not expose graphiql.', () => {
    expect(opt.graphiql).toEqual(false)
  })
})
