import React, { PureComponent } from 'react'
import { string, func } from 'prop-types'
import { connect } from 'react-redux'
import Papa from 'papaparse'
import { Button, Typography } from '@material-ui/core'
import { changeCredits } from '../../util/actions/credits'
import { file } from '../../util/propTypes'

class CreditsInput extends PureComponent {
  handlePreview = () => {
    const { csvFile, delimiter, changeValue } = this.props
    if (!csvFile) { return }
    Papa.parse(csvFile, {
      delimiter,
      header: true,
      skipEmptyLines: true,
      complete: result => changeValue({
        credits: result.data,
        headers: result.meta.fields
      })
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

CreditsInput.propTypes = {
  delimiter: string.isRequired,
  csvFile: file,
  changeValue: func.isRequired
}

CreditsInput.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CreditsInput)
