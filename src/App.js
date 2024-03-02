import React from 'react';
import './App.css';
import './styles/sub-style.css';
import Portfolio from './components/portfolio.js';
import Starter from './components/starter.js';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <React.Fragment>
      {/* <Starter/> */}
      <Portfolio />
    </React.Fragment>
  )
};

export default App;
