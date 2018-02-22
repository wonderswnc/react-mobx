import React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

const ChildrenRoute = ({ to, label }) => (
  <Route path={to} children={() => (
    <div><Link to={to}>{ label }</Link></div>
  )}/>
)

const Home = () => <h2>Home Route has matched</h2>
const Page = () => <h2>Page Route has matched</h2>
const Wrapper = ({
  children
}) => (
  <div>
    below is my child component :
    { children }
  </div>
)

export default class RouteTestPage extends React.Component {
  render() {
    return (
      <div>
        <ChildrenRoute to='/route/home' label='home' />
        <ChildrenRoute to='/route/page' label='page' />
        <hr/>
        <Wrapper>
          <Switch>
            <Route path='/route/home' component={Home} />
            <Route path='/route/page' component={Page} />
          </Switch>
        </Wrapper>
      </div>
    )
  }
}