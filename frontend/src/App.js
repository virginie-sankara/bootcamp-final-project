import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { user, loginWithPopup, logout, isAuthenticated } = useAuth0();

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    // TODO: POST info to server
  };

  return (
    <main>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                loginWithPopup={loginWithPopup}
                logout={logout}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route path="/form" element={<Form handleSubmit={handleSubmit} />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
