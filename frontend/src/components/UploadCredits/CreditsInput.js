import React, { PureComponent } from 'react'
import { string, func } from 'prop-types'
import { connect } from 'react-redux'
import Papa from 'papaparse'
import { Button, Typography } from '@material-ui/core'
import { changeCredits } from '../../util/actions/uploadCredits'
import { file } from '../../util/propTypes'
import parseCredits from './helpers/parseCredits'

export class CreditsInputComponent extends PureComponent {
  handlePreview = () => {
    const { csvFile, delimiter, changeValue } = this.props
    if (!csvFile) { return }
    Papa.parse(csvFile, {
      delimiter,
      header: true,
      skipEmptyLines: true,
      complete: result => changeValue(parseCredits(result.data))
    })
  }

  render() {
    const { csvFile } = this.props
    return (
      <div>
        <Button
          type="button"
          disabled={!csvFile}
          onClick={this.handlePreview}
          variant="contained"
          color="secondary"
        >
          <Typography>Parse</Typography>
        </Button>
      </div>
    )
  }
}

CreditsInputComponent.propTypes = {
  delimiter: string.isRequired,
  csvFile: file,
  changeValue: func.isRequired
}

CreditsInputComponent.defaultProps = {
  csvFile: null
}

const mapStateToProps = state => ({
  delimiter: state.uploadCredits.delimiter,
  csvFile: state.uploadCredits.file,
  value: state.uploadCredits.credits
})

const mapDispatchToProps = {
  changeValue: changeCredits
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditsInputComponent)
