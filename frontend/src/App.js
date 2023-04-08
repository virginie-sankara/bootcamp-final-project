import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./Home";
import Form from "./Form";
import Form2 from "./Form2";
import ConfirmationPost from "./ConfirmationPost";
import CompletedMatches from "./CompletedMatches";
import Suggestion from "./Suggestion";
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
  // FETCH movie + tv genres
  const [movieGenresData, setMovieGenresData] = useState([]);
  const [tvGenresData, setTvGenresData] = useState([]);

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

  //   GET : Movie + TV genres
  useEffect(() => {
    Promise.all([fetch("/get-movie-genres"), fetch("/get-tv-genres")])
      .then(([movieGenresRes, tvGenresRes]) =>
        Promise.all([movieGenresRes.json(), tvGenresRes.json()])
      )
      .then(([movieGenres, tvGenres]) => {
        if (
          movieGenres.status === 400 ||
          movieGenres.status === 500 ||
          tvGenres.status === 400 ||
          tvGenres.status === 500
        ) {
          throw new Error(`${movieGenres.message}, ${tvGenres.message}`);
        } else {
          setMovieGenresData(movieGenres.movieGenres);
          console.log(movieGenres);
          setTvGenresData(tvGenres.tvGenres);
        }
      });
  }, []);

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
              <Route
                path="/form"
                element={
                  <Form
                    userData={userData}
                    movieGenresData={movieGenresData}
                    tvGenres={tvGenresData}
                  />
                }
              />
              <Route
                path="/invitations"
                element={
                  <Invitations userData={userData} userInvites={userInvites} />
                }
              />
              <Route
                path="/invitation-response/:matchId"
                element={
                  <Form2
                    userData={userData}
                    movieGenresData={movieGenresData}
                    tvGenres={tvGenresData}
                  />
                }
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
              <Route
                path="/match-result/:matchId"
                element={
                  <Suggestion
                    userData={userData}
                    completedMatches={completedMatches}
                    movieGenresData={movieGenresData}
                    tvGenres={tvGenresData}
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
