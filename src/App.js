import "./App.css";
import SignInOutContainer from "./containers/Index";
import { useUserContext } from "./context/userContext";
import Dashboard from "./components/Dashboard";

function App() {
  const { loading, error, user } = useUserContext();

  return (
    <>
      {error && <p>{error}</p>}
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>{user ? <Dashboard /> : <SignInOutContainer />}</>
      )}
    </>
  );
}

export default App;
