import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Basic from './src/Basic'
import Controlled from './src/Controlled'
import CustomComponents from './src/CustomComponents'
import Carousel from './src/Carousel'
import Modal from './src/Modal'
import Scroll from './src/Scroll'
import NotFound from './src/NotFound'

import CodeSandboxEdit from './src/components/CodeSandboxEdit'
import Footer from './src/components/Footer'
import GitHubRepo from './src/components/GitHubRepo'
import ScrollToTop from './src/components/ScrollToTop'

import './App.css'

interface State {
  breakpoint: string
}

const { NODE_ENV } = process.env

class App extends React.Component<any, State> {
  private debounceTimeout?: number

  constructor(props: any) {
    super(props)

    this.state = {
      breakpoint: this.getScreenSize()
    }
  }

  public componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  public componentWillUnmount() {
    window.addEventListener('resize', this.handleResize)
  }

  private getScreenSize = () => {
    const { innerWidth } = window
    let breakpoint = 'xs'

    if (innerWidth >= 1024) {
      breakpoint = 'lg'
    } else if (innerWidth >= 768) {
      breakpoint = 'md'
    } else if (innerWidth >= 400) {
      breakpoint = 'sm'
    }

    return breakpoint
  }

  private handleResize = () => {
    clearTimeout(this.debounceTimeout)

    this.debounceTimeout = window.setTimeout(() => {
      this.setState({ breakpoint: this.getScreenSize() })
    }, 250)
  }

  public render() {
    const { breakpoint } = this.state

    return (
      <BrowserRouter>
        <ScrollToTop>
          <Switch>
            <Route
              exact={true}
              path="/"
              render={props => <Basic {...props} breakpoint={breakpoint} />}
            />
            <Route path="/controlled/:page?" component={Controlled} />
            <Route path="/custom" component={CustomComponents} />
            <Route path="/carousel" component={Carousel} />
            <Route path="/modal" component={Modal} />
            <Route path="/scroll" component={Scroll} />
            <Route component={NotFound} />
          </Switch>
          {NODE_ENV === 'production' && <CodeSandboxEdit />}
          {NODE_ENV === 'production' && <GitHubRepo />}
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}
export default App
