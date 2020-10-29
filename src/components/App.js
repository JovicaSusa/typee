import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import TypingBoard from './TypingBoard';
import Result from './Result';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path="/type" component={TypingBoard} />
        <Route path="/result" component={Result} />
      </Switch>
    )
  }
};

export default App;
