import React from 'react'
import { LocalizeContext } from 'react-localize-redux'


const withLocalize = translationBase => WrappedComponent => {
  const LocalizedComponent = props => (
    <LocalizeContext.Consumer>
      {context => (
        <WrappedComponent
          {...context}
          {...props}
          translate={id => context.translate(`${translationBase}.${id}`)}
        />
      )}
    </LocalizeContext.Consumer>
  )
  return LocalizedComponent
}

export default withLocalize
