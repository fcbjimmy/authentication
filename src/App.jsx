import React from 'react';
import './App.css';
import SignInOutContainer from './containers/Index';
import { useUserContext } from './context/userContext';
import Dashboard from './components/Dashboard';

function App() {
  const { loading, error, user } = useUserContext();

  const test = user ? <Dashboard /> : <SignInOutContainer />;

  return (
    <>
      {error && <p>{error}</p>}
      {loading ? <h2>Loading...</h2> : test}
    </>
  );
}

export default App;
