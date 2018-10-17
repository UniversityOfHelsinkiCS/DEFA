import React from 'react'
import { instanceOf } from 'prop-types'
import { connect } from 'react-redux'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import Main from './Main'

const ApolloContainer = ({ client }) => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </ApolloProvider>
)

ApolloContainer.propTypes = {
  client: instanceOf(ApolloClient).isRequired
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
