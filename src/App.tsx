import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import { useAccessToken } from '../src/lib/auth/useAccessToken';
function App() {
  const { isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();
  const [accessToken, isLoading] = useAccessToken();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        Hello {user!.name}
        <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
        {accessToken ? (
          <pre>{JSON.stringify(accessToken, null, 2)}</pre>
        ) : (
          'No user metadata defined'
        )}
      </div>
    );
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
}

export default App;
