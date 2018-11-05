import React from 'react'
import { func, node } from 'prop-types'
import { connect } from 'react-redux'
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from 'apollo-boost'
import { onError } from 'apollo-link-error'
import { ApolloProvider } from 'react-apollo'
import handleError from '../util/actions/handleApolloError'

const httpLink = new HttpLink({
  uri: `${process.env.API_URL}/query`
})

const auth = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('DEFA-token')
    }
  })
  return forward(operation)
})

const ApolloContainer = ({ errorHandler, children }) => (
  <ApolloProvider
    client={new ApolloClient({
      link: onError(errorHandler).concat(auth.concat(httpLink)),
      cache: new InMemoryCache()
    })}
  >
    {children}
  </ApolloProvider>
)

ApolloContainer.propTypes = {
  errorHandler: func.isRequired,
  children: node.isRequired
}

const mapStateToProps = state => ({
  authorization: state.user.token
})

const mapDispatchToProps = dispatch => ({
  errorHandler: handleError(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ApolloContainer)
