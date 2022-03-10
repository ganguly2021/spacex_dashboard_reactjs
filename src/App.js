import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'

import Navbar from './components/Layout/Navbar'
import DashboardContainer from './components/Dashboard/DashboardContainer'
import Footer from './components/Layout/Footer'
import ErroPage from './components/common/ErroPage'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={DashboardContainer} />
          <Route path="*" component={ErroPage} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  )

}

export default App
