import React from 'react';
import ReactDOM from 'react-dom';
import './sass/main.scss'
import App from './components/App';
import { AppProvider } from './components/context'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
