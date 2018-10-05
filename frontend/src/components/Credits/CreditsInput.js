import React, { PureComponent } from 'react'
import { string, arrayOf, object, func } from 'prop-types'
import { connect } from 'react-redux'
import Papa from 'papaparse'
import { changeCredits } from '../../util/actions/credits'
import CreditsPreview from './CreditsPreview'
import { file } from '../../util/propTypes'

class CreditsInput extends PureComponent {
  handlePreview = () => {
    const { csvFile, delimiter, changeValue } = this.props
    if (!csvFile) { return }
    Papa.parse(csvFile, {
      delimiter,
      header: true,
      skipEmptyLines: true,
      complete: result => changeValue(result.data)
    })
  }

  render() {
    const { csvFile, value } = this.props
    return (
      <div>
        <button
          type="button"
          disabled={!csvFile}
          onClick={this.handlePreview}
        >
          Parse
        </button>
        <div>
          {value.map(credit => (
            <CreditsPreview
              key={Object.values(credit).reduce((acc, curr) => acc + curr, '')}
              credit={credit}
            />
          ))}
        </div>
      </div>
    )
  }
}

CreditsInput.propTypes = {
  delimiter: string.isRequired,
  csvFile: file,
  value: arrayOf(object).isRequired,
  changeValue: func.isRequired
}

CreditsInput.defaultProps = {
  csvFile: null
}

const mapStateToProps = state => ({
  delimiter: state.credits.delimiter,
  csvFile: state.credits.file,
  value: state.credits.credits
})

const mapDispatchToProps = {
  changeValue: changeCredits
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditsInput)
