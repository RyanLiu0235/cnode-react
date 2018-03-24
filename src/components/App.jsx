import React, {
  Component
} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import IndexPage from './IndexPage'
import TopicDetail from './TopicDetail'
import ToTop from './ToTop'
import GoBack from './GoBack'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={IndexPage} />
          <Route path="/tab/:id" component={IndexPage} />
          <Route path="/topic/:id" component={TopicDetail} />
          <GoBack />
          <ToTop />
        </div>
      </Router>
    )
  }
}

export default App