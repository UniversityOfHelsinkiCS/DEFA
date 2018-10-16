import React from 'react'
import { instanceOf } from 'prop-types'
import { connect } from 'react-redux'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Main from './Main'

const ApolloContainer = ({ client }) => (
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>
)

ApolloContainer.propTypes = {
  client: instanceOf(ApolloClient).isRequired
}

const mapStateToProps = state => ({
  client: new ApolloClient({
    uri: `${process.env.API_URL}/query`,
    headers: {
      Authentication: state.user.token
    }
  })
})

export default connect(mapStateToProps, null)(ApolloContainer)
