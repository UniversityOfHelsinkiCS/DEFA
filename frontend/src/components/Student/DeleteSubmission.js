import React from 'react'
import { connect } from 'react-redux'
import { string, func } from 'prop-types'
import { withLocalize } from 'react-localize-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Mutation } from 'react-apollo'
import { deleteSubmission } from '../../util/queries/deleteSubmission'
import { deleteSubmissionAction } from '../../util/actions/submission'

const TRANSLATION_BASE = 'Student.DeleteSubmission'

export class DeleteSubmissionComponent extends React.Component {
  state = {
    open: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { id, token, dispatchDeleteSubmission, translate } = this.props
    const { open } = this.state
    this.translate = translateId => translate(`${TRANSLATION_BASE}.${translateId}`)

    return (
      <Mutation
        mutation={deleteSubmission}
        variables={{
          id,
          token
        }}
        onCompleted={() => dispatchDeleteSubmission(id)}
      >
        {mutate => (
          <div>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
              {this.translate('delete')}
              <DeleteIcon />
            </Button>
            <Dialog
              open={open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{this.translate('dialogTitle')}</DialogTitle>
              <DialogActions>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={mutate}
                >
                  {this.translate('yes')}
                </Button>
                <Button onClick={this.handleClose} color="primary">
                  {this.translate('no')}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </Mutation>
    )
  }
}


DeleteSubmissionComponent.propTypes = {
  token: string.isRequired,
  id: string.isRequired,
  dispatchDeleteSubmission: func.isRequired,
  translate: func.isRequired
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

const mapDispatchToProps = {
  dispatchDeleteSubmission: deleteSubmissionAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withLocalize(DeleteSubmissionComponent)
)
