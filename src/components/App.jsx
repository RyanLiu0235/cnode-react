import React, {
  Component
} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import IndexPage from './IndexPage'
import TopicDetail from './TopicDetail'
import SignIn from './SignIn'
import ToTop from './ToTop'
import NavBar from './NavBar'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route path="/" exact component={IndexPage} />
          <Route path="/tab/:id" component={IndexPage} />
          <Route path="/topic/:id" component={TopicDetail} />
          <Route path="/signin" component={SignIn} />
          <ToTop />
        </div>
      </Router>
    )
  }
}

export default App
