import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './Home';
import TypingBoard from './TypingBoard';
import Result from './Result';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <div className="px-12 pt-4">
          <Link to="/">
            <svg className="cursor-pointer w-24 h-8 inline-block" viewBox="0 0 41 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.18 2.6H4.452L5.04 9.056H5.064L5.688 2.6H7.128L7.752 9.056H7.776L8.364 2.6H9.504L8.652 11H7.008L6.408 5.336H6.384L5.784 11H4.032L3.18 2.6ZM10.1717 2.6H13.7717V3.8H11.4917V6.02H13.3037V7.22H11.4917V9.8H13.7717V11H10.1717V2.6ZM21.3287 3.8H19.9487V2.6H24.0287V3.8H22.6487V11H21.3287V3.8ZM25.9267 7.424L24.3307 2.6H25.7347L26.6347 5.684H26.6587L27.5587 2.6H28.8427L27.2467 7.424V11H25.9267V7.424ZM29.4373 2.6H31.3813C32.0373 2.6 32.5293 2.776 32.8573 3.128C33.1853 3.48 33.3493 3.996 33.3493 4.676V5.504C33.3493 6.184 33.1853 6.7 32.8573 7.052C32.5293 7.404 32.0373 7.58 31.3813 7.58H30.7573V11H29.4373V2.6ZM31.3813 6.38C31.5973 6.38 31.7573 6.32 31.8613 6.2C31.9733 6.08 32.0293 5.876 32.0293 5.588V4.592C32.0293 4.304 31.9733 4.1 31.8613 3.98C31.7573 3.86 31.5973 3.8 31.3813 3.8H30.7573V6.38H31.3813ZM34.0662 2.6H37.6662V3.8H35.3862V6.02H37.1982V7.22H35.3862V9.8H37.6662V11H34.0662V2.6Z" fill="black"/>
              <path d="M15.5 10H19.5V11H15.5V10Z" fill="black"/>
              <rect x="0.5" y="0.5" width="40" height="13" stroke="black"/>
            </svg>
          </Link>
        </div>

          <Switch>
            <Route path='/' component={Home} exact />
            <Route path="/typing-test" component={TypingBoard} />
            <Route path="/typing-result" component={Result} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
};

export default App;
