import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";
import Form2 from "./Form2";
import ConfirmationPost from "./ConfirmationPost";
import CompletedMatches from "./CompletedMatches";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import Invitations from "./Invitations";
// import styled from "styled-components";

const App = () => {
  const { user, loginWithPopup, logout, isAuthenticated, isLoading } =
    useAuth0();
  const [userData, setUserData] = useState(null);
  const [userInvites, setUserInvites] = useState(null);
  const [completedMatches, setCompletedMatches] = useState(null);

  console.log(userData);

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

  //   GET : User invites
  useEffect(() => {
    if (user) {
      console.log(user);
      fetch(`/get-user-invites/${user.email}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 400 || response.status === 500) {
            throw new Error(response.message);
          } else {
            setUserInvites(response.userInvites);
            console.log("user invites here");
            console.log(response.userInvites);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }, [user]);

  //  GET : Completed matches
  useEffect(() => {
    if (user) {
      console.log(user);
      fetch(`/get-completed-matches/${user.email}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 400 || response.status === 500) {
            throw new Error(response.message);
          } else {
            setCompletedMatches(response.data);
            console.log("user completed matches here");
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }, [user]);

  return (
    <main>
      {isAuthenticated && userData ? (
        <>
          <nav
            style={{
              background: "red",
            }}
          >
            <button onClick={logout}>Logout</button>
          </nav>
          <Router>
            <Routes>
              <Route
                path="/"
                element={<Home userData={userData} userInvites={userInvites} />}
              />
              <Route path="/form" element={<Form userData={userData} />} />
              <Route
                path="/invitations"
                element={
                  <Invitations userData={userData} userInvites={userInvites} />
                }
              />
              <Route
                path="/invitation-response/:matchId"
                element={<Form2 userData={userData} />}
              />
              <Route
                path="/confirmation/:matchId"
                element={<ConfirmationPost userData={userData} />}
              />
              <Route
                path="/completed-matches/:useremail"
                element={
                  <CompletedMatches
                    userData={userData}
                    completedMatches={completedMatches}
                  />
                }
              />
            </Routes>
          </Router>
        </>
      ) : (
        <button onClick={loginWithPopup}>Login</button>
      )}
    </main>
  );
};

export default App;
