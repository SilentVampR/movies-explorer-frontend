import React from 'react';
import ReactDOM from 'react-dom';
import './vendor/normalize.css';
import './vendor/fonts/inter.css';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
