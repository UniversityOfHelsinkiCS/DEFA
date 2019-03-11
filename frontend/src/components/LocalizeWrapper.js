import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withLocalize } from 'react-localize-redux'
import { renderToStaticMarkup } from 'react-dom/server'
import translation from '../translation.json'
import { getLanguage } from '../util/language'

class LocalizeWrapper extends PureComponent {
  constructor(props) {
    super(props)
    const { initialize } = this.props
    initialize({
      languages: [
        { name: 'English', code: 'eng' },
        { name: 'Suomi', code: 'fin' },
        { name: 'Svenska', code: 'swe' }
      ],
      translation,
      options: {
        renderToStaticMarkup,
        onMissingTranslation: this.missingTranslationHandler
      }
    })
  }

  componentDidMount() {
    const { setActiveLanguage } = this.props
    const code = getLanguage()
    setActiveLanguage(code || 'fin')
  }

  missingTranslationHandler = ({ translationId }) => {
    const { translate } = this.props
    // Recursively look through tree structure in translation.json for "common" translations
    // in nodes below until the root or a suitable translation is reached.
    const path = translationId.split('.')
    switch (path.length) {
      case 1:
        return `missing translation: ${translationId}`
      case 2:
        if (path[0] === 'common') return `missing translation: ${path[1]}`
        path[0] = 'common'
        break
      default:
        if (path[path.length - 2] === 'common') path.splice(path.length - 3, 1)
        else path[path.length - 2] = 'common'
    }
    return translate(path.join('.'))
  }

  render() {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}

LocalizeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  initialize: PropTypes.func.isRequired,
  setActiveLanguage: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
}

export default withLocalize(LocalizeWrapper)
