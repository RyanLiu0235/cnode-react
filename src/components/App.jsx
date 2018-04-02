import React, {
  Component
} from 'react'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import IndexPage from './IndexPage'
import TopicDetail from './TopicDetail'
import SignIn from './SignIn'
import User from './User'
import ToTop from './ToTop'
import NavBar from './NavBar'
import Footer from './Footer'

class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <div>
            <NavBar />
            <Route path="/" exact component={IndexPage} />
            <Route path="/tab/:id" component={IndexPage} />
            <Route path="/topic/:id" component={TopicDetail} />
            <Route path="/signin" component={SignIn} />
            <Route path="/user/:name" component={User} />
            <ToTop />
            <Footer />
          </div>
        </ScrollToTop>
      </Router>
    )
  }
}

export default App
