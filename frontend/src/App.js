import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";
import Confirmation from "./Confirmation";
import { useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import styled from "styled-components";

const App = () => {
  const { user, loginWithPopup, logout, isAuthenticated } = useAuth0();
  // const [friendId, setFriendId] = useState("");
  // const [type, setType] = useState("");
  const [userData, setUserData] = useState([]);

  //   GET : User data
  useEffect(() => {
    if (user) {
      console.log(user);
      fetch(`/user/${user.email}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 400 || response.status === 500) {
            throw new Error(response.message);
          } else {
            setUserData(response.user);
            console.log("test");
            console.log(response.user);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }, [user]);

  // const navigate = useNavigate();

  return (
    <main>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                userData={userData}
                loginWithPopup={loginWithPopup}
                logout={logout}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/form"
            element={<Form userData={userData} user={user} />}
          />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
