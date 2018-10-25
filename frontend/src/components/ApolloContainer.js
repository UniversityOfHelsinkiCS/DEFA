import React from 'react'
import { instanceOf, node } from 'prop-types'
import { connect } from 'react-redux'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const ApolloContainer = ({ client, children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)

ApolloContainer.propTypes = {
  client: instanceOf(ApolloClient).isRequired,
  children: node.isRequired
}

const mapStateToProps = state => ({
  client: new ApolloClient({
    uri: `${process.env.API_URL}/query`,
    headers: {
      authorization: state.user.token
    }
  })
})

export default connect(mapStateToProps, null)(ApolloContainer)
