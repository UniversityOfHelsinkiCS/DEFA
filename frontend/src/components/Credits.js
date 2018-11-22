import React from 'react'
import { Query } from 'react-apollo'
import { getCredits } from '../util/queries/getCredits'
import CreditT from './CreditTable'

const Credits = () => {
  console.log('yo')

  return (
    <Query query={getCredits}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`
        return (
          <CreditT credits={data.credits} />
        )
      }}
    </Query>
  )
}

export default Credits
