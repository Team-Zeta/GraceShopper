import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, UserHome} from './components'
import {me} from './store'
import AllBooks from './components/AllBooks'
import SingleBookView from './components/SingleBookView'
import {Cart} from './components/cart'
import Admin from './components/admin'
import NewUserForm from './components/NewUserForm'
import {Checkout} from './components/checkout'
import UserProfile from './components/UserProfile'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={NewUserForm} />
          <Route path="/cart" component={Cart} />
          <Route exact path="/" component={AllBooks} />
          <Route path="/books/:id" component={SingleBookView} />
          <Route path="/checkout" component={Checkout} />

          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/userprofile" component={UserProfile} />
            </Switch>
          )}

          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
          {isLoggedIn &&
            isAdmin && (
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/admin" component={Admin} />
              </Switch>
            )}
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
