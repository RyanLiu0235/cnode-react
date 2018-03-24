import React, {
  Component
} from 'react'
import {
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom'
import IndexPage from './IndexPage'
import TopicDetail from './TopicDetail'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={IndexPage} />
          <Route path="/topic/:id" component={TopicDetail} />
        </div>
      </Router>
    )
  }
}

export default App