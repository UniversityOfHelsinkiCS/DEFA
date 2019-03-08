import React from 'react'
import { connect } from 'react-redux'
import { string, func } from 'prop-types'
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
    const { id, token, dispatchDeleteSubmission } = this.props
    const { open } = this.state

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
              Delete
              <DeleteIcon />
            </Button>
            <Dialog
              open={open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Delete this submission?</DialogTitle>
              <DialogActions>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={mutate}
                >
                  Yes
                </Button>
                <Button onClick={this.handleClose} color="primary">
                  No wait
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
  dispatchDeleteSubmission: func.isRequired
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

const mapDispatchToProps = {
  dispatchDeleteSubmission: deleteSubmissionAction
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteSubmissionComponent)
