import React from 'react';
import './App.css';
import SignInOutContainer from './containers/Index';
import { useUserContext } from './context/userContext';
import Dashboard from './pages/Dashboard';

function App() {
  const { loading, error, user } = useUserContext();

  const alertMessage = (err) => {
    alert(err);
  };

  return (
    <>
      {error && alertMessage(error)}
      {loading && <h2>Loading...</h2>}
      {!loading && user && <Dashboard />}
      {!loading && user == null && <SignInOutContainer />}
    </>
  );
}

export default App;
