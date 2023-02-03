import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Helmet } from 'react-helmet';
import store, { persistor } from './store';
import history from './services/history';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Routes from './routes';
import GoogleFonts from './components/Header/googleFonts';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <GoogleFonts />
          <Header />
          <Routes />
          <GlobalStyles />
          <ToastContainer autoClose={3500} className="toast-container" />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
