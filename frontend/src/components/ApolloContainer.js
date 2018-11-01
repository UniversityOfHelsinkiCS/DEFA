import React from 'react'
import { string, func, node } from 'prop-types'
import { connect } from 'react-redux'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import handleError from '../util/actions/handleApolloError'

const ApolloContainer = ({ authorization, onError, children }) => (
  <ApolloProvider
    client={new ApolloClient({
      uri: `${process.env.API_URL}/query`,
      headers: {
        authorization
      },
      onError
    })}
  >
    {children}
  </ApolloProvider>
)

ApolloContainer.propTypes = {
  authorization: string,
  onError: func.isRequired,
  children: node.isRequired
}

ApolloContainer.defaultProps = {
  authorization: null
}

const mapStateToProps = state => ({
  authorization: state.user.token
})

const mapDispatchToProps = dispatch => ({
  onError: handleError(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ApolloContainer)
