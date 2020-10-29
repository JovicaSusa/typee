import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import TypingBoard from './TypingBoard';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path="/type" component={TypingBoard} />
      </Switch>
    )
  }
};

export default App;
