import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import Nav from './Nav'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav/>
            {
              this.props.loading 
                ? null 
                : <Switch>
                    <Route path='/tweet/:id' component={TweetPage} />
                    <Route path='/new' component={NewTweet}></Route>
                    <Route path='/' component={Dashboard}></Route>
                  </Switch>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)