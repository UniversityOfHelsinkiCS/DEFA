import React, { PureComponent } from 'react'
import { shape, string, node, func } from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, TextField, Select, MenuItem, Button, CircularProgress } from '@material-ui/core'
import { Mutation } from 'react-apollo'
import { editUser } from '../../util/queries/editUsers'
import CardContainer from '../Student/CardContainer'
import { editUserSuccess } from '../../util/actions/admin'
import { parseClasses } from '../../util/propTypes'

const ROWS = [
  { label: 'name', field: 'name' },
  { label: 'student number', field: 'studentNumber' },
  { label: 'role', field: 'role' },
  { label: 'username', field: 'username' },
  { label: 'cn', field: 'cn' },
  { label: 'email', field: 'email' }
]

const styles = {
  editButton: {
    margin: '20px 10px 10px 10px'
  },
  faded: {
    opacity: 0.5
  },
  progressContainer: {
    height: '0px',
    width: '100%'
  },
  progress: {
    opacity: 1,
    zIndex: 2,
    position: 'relative',
    left: '50%',
    marginLeft: '-20px',
    top: '250px'
  }
}

const Row = ({ label, value }) => (
  <React.Fragment>
    <Grid item xs={3}>
      <Typography>{label}</Typography>
    </Grid>
    <Grid item xs={9}>
      {value}
    </Grid>
  </React.Fragment>
)
Row.propTypes = {
  label: string.isRequired,
  value: node.isRequired
}

class UserSearchResultItemComponent extends PureComponent {
  constructor(props) {
    super(props)
    const user = { ...props.user }
    delete user.id
    this.state = {
      editing: false,
      loading: false,
      values: user
    }
  }

  changeField = field => event => {
    const { values } = this.state
    this.setState({
      values: {
        ...values,
        [field]: event.target.value
      }
    })
  }

  rowMapper = row => {
    const { user } = this.props
    const { editing, values } = this.state
    let value
    if (!editing) {
      value = <Typography>{user[row.field]}</Typography>
    } else {
      switch (row.field) {
        case 'role':
          value = (
            <Select
              value={values[row.field]}
              onChange={this.changeField(row.field)}
            >
              <MenuItem value="STUDENT">
                <Typography>STUDENT</Typography>
              </MenuItem>
              <MenuItem value="PRIVILEGED">
                <Typography>PRIVILEGED</Typography>
              </MenuItem>
              <MenuItem value="ADMIN">
                <Typography>ADMIN</Typography>
              </MenuItem>
            </Select>
          )
          break
        default:
          value = (
            <TextField
              onChange={this.changeField(row.field)}
              value={values[row.field]}
            />
          )
          break
      }
    }
    return (
      <Row
        key={row.field}
        label={row.label}
        value={value}
      />
    )
  }

  toggleEditing = value => () => {
    this.setState({
      editing: value
    })
  }

  saveChanges = mutate => () => {
    this.setState({
      loading: true
    })
    mutate()
  }

  onCompleted = data => {
    const { dispatchEditUserSuccess } = this.props
    const user = data.authenticate.editUser
    dispatchEditUserSuccess(user)
    this.setState({
      editing: false,
      loading: false
    })
  }

  notEditingButtons = () => {
    const { classes } = this.props
    return (
      <div>
        <Button
          className={classes.editButton}
          color="primary"
          variant="contained"
          onClick={this.toggleEditing(true)}
        >
          Edit
        </Button>
      </div>
    )
  }

  editingButtons = () => {
    const { user, token, classes } = this.props
    const { values } = this.state
    return (
      <div>
        <Button
          className={classes.editButton}
          color="secondary"
          variant="contained"
          onClick={this.toggleEditing(false)}
        >
          Cancel
        </Button>
        <Mutation
          mutation={editUser}
          variables={{
            id: user.id,
            values,
            token
          }}
          onCompleted={this.onCompleted}
        >
          {mutate => (
            <Button
              className={classes.editButton}
              color="primary"
              variant="contained"
              onClick={this.saveChanges(mutate)}
            >
              Save
            </Button>
          )}
        </Mutation>
      </div>
    )
  }

  render() {
    const { user, classes } = this.props
    const { editing, loading } = this.state
    return (
      <div className={loading ? classes.faded : null}>
        <div className={classes.progressContainer}>
          {loading ? <CircularProgress className={classes.progress} /> : null}
        </div>
        <CardContainer
          title={user.name}
        >
          <Grid container spacing={32}>
            {ROWS.map(this.rowMapper)}
          </Grid>
          {editing ? <this.editingButtons /> : <this.notEditingButtons />}
        </CardContainer>
      </div>
    )
  }
}

UserSearchResultItemComponent.propTypes = {
  user: shape({
    id: string.isRequired,
    name: string.isRequired,
    username: string.isRequired,
    studentNumber: string.isRequired,
    cn: string.isRequired,
    role: string.isRequired,
    email: string.isRequired
  }).isRequired,
  token: string.isRequired,
  dispatchEditUserSuccess: func.isRequired,
  classes: parseClasses(styles).isRequired
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

const mapDispatchToProps = {
  dispatchEditUserSuccess: editUserSuccess
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserSearchResultItemComponent))
