import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled from "styled-components";
import CompletedMatches from "./CompletedMatches";
import ConfirmationPost from "./ConfirmationPost";
import Form from "./Form";
import Form2 from "./Form2";
import GlobalStyle from "./GlobalStyle";
import Home from "./Home";
import Invitations from "./Invitations";
import Suggestion from "./Suggestion";

const App = () => {
  const { user, loginWithPopup, logout, isAuthenticated } =
    useAuth0();
  const [userData, setUserData] = useState(null);
  const [userInvites, setUserInvites] = useState(null);
  const [completedMatches, setCompletedMatches] = useState(null);
  // FETCH movie + tv genres
  const [movieGenresData, setMovieGenresData] = useState([]);
  const [tvGenresData, setTvGenresData] = useState([]);

  // console.log(userData);

  //   GET : User data
  useEffect(() => {
    if (user) {
      fetch(`/user/${user.email}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 400 || response.status === 500) {
            throw new Error(response.message);
          } else {
            setUserData(response.user);
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
      fetch(`/get-user-invites/${user.email}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 400 || response.status === 500) {
            throw new Error(response.message);
          } else {
            setUserInvites(response.userInvites);
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
      fetch(`/get-completed-matches/${user.email}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 400 || response.status === 500) {
            throw new Error(response.message);
          } else {
            setCompletedMatches(response.data);
            // console.log("user completed matches here");
            // console.log(response.data);
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
          setTvGenresData(tvGenres.tvGenres);
        }
      });
  }, []);

  return (
    <Main>
      <GlobalStyle />
      <Router>
        <Nav>
          <HomeLogoLink>
            <svg
              width="40"
              height="40"
              viewBox="0 0 6994 3810"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4413.8 320.36H5693.68V1713.09H4413.8V320.36Z"
                fill="#001FB0"
                fill-opacity="0.8"
              />
              <path
                d="M3897.08 1988.53H5168.98V3335.18H3897.08V1988.53Z"
                fill="#A42F29"
                fill-opacity="0.8"
              />
              <path
                d="M5723.92 0C5983.28 0 6208.31 40.045 6399.01 120.135C6593.53 196.411 6740.37 303.198 6839.53 440.495C6942.51 573.979 6994 728.438 6994 903.874C6994 1003.03 6980.65 1094.56 6953.95 1178.47C6843.35 1563.66 6524.87 1807.75 5998.54 1910.72C6181.61 1964.11 6326.54 2053.74 6433.34 2179.59C6540.13 2301.64 6593.53 2454.19 6593.53 2637.25C6593.53 2721.16 6578.27 2820.32 6547.76 2934.73C6463.85 3232.21 6294.12 3453.41 6038.58 3598.33C5786.86 3739.44 5428.34 3810 4963.02 3810H2583.06C2502.97 3810 2441.94 3796.65 2399.99 3769.95C2354.22 3743.26 2331.33 3707.03 2331.33 3661.26C2331.33 3638.38 2337.05 3613.59 2348.5 3586.89C2363.75 3544.94 2388.54 3512.52 2422.87 3489.64C2457.2 3466.76 2478.17 3453.41 2485.8 3449.59C2546.83 3411.46 2596.41 3373.32 2634.55 3335.18C2672.69 3293.23 2705.11 3226.49 2731.81 3134.95L3429.78 669.324C3445.03 619.745 3452.66 572.072 3452.66 526.306C3452.66 484.354 3445.03 450.03 3429.78 423.333C3418.34 392.823 3401.17 358.498 3378.29 320.36C3343.96 270.781 3326.8 230.736 3326.8 200.225C3326.8 188.784 3330.61 167.808 3338.24 137.297C3353.5 87.7176 3385.92 53.3933 3435.5 34.3242C3488.9 11.4414 3568.99 0 3675.78 0H5723.92ZM5466.48 1046.89C5493.17 962.988 5506.52 884.805 5506.52 812.342C5506.52 614.024 5394.01 514.865 5168.98 514.865H4911.53L4608.32 1584.64H4860.04C5020.23 1584.64 5146.1 1546.5 5237.63 1470.23C5332.98 1390.14 5409.27 1249.02 5466.48 1046.89ZM5048.84 2728.78C5075.54 2637.25 5088.89 2553.35 5088.89 2477.07C5088.89 2271.13 4970.65 2168.15 4734.18 2168.15H4448.13L4122.03 3295.14H4413.8C4577.8 3295.14 4709.39 3255.09 4808.55 3175C4907.72 3091.1 4987.81 2942.36 5048.84 2728.78Z"
                fill="white"
              />
              <path
                d="M1684.93 1925.25H2964.81V3317.97H1684.93V1925.25Z"
                fill="#001FB0"
                fill-opacity="0.8"
              />
              <path
                d="M2242.91 346.104H3514.82V1692.75H2242.91V346.104Z"
                fill="#A42F29"
                fill-opacity="0.8"
              />
              <path
                d="M3392.59 0C3651.95 0 3876.97 40.045 4067.68 120.135C4262.19 196.411 4409.03 303.198 4508.2 440.495C4611.18 573.979 4662.67 728.438 4662.67 903.874C4662.67 1003.03 4649.32 1094.56 4622.62 1178.47C4512.01 1563.66 4193.54 1807.75 3667.2 1910.72C3850.28 1964.11 3995.21 2053.74 4102 2179.59C4208.8 2301.64 4262.19 2454.19 4262.19 2637.25C4262.19 2721.16 4246.94 2820.32 4216.42 2934.73C4132.51 3232.21 3962.79 3453.41 3707.25 3598.33C3455.52 3739.44 3097 3810 2631.69 3810H251.727C171.632 3810 110.607 3796.65 68.6528 3769.95C22.8843 3743.26 0 3707.03 0 3661.26C0 3638.38 5.72106 3613.59 17.1632 3586.89C32.4194 3544.94 57.2106 3512.52 91.537 3489.64C125.863 3466.76 146.841 3453.41 154.469 3449.59C215.493 3411.46 265.076 3373.32 303.216 3335.18C341.357 3293.23 373.776 3226.49 400.474 3134.95L1098.44 669.324C1113.7 619.745 1121.33 572.072 1121.33 526.306C1121.33 484.354 1113.7 450.03 1098.44 423.333C1087 392.823 1069.84 358.498 1046.95 320.36C1012.63 270.781 995.465 230.736 995.465 200.225C995.465 188.784 999.279 167.808 1006.91 137.297C1022.16 87.7176 1054.58 53.3933 1104.17 34.3242C1157.56 11.4414 1237.66 0 1344.45 0H3392.59ZM3135.14 1046.89C3161.84 962.988 3175.19 884.805 3175.19 812.342C3175.19 614.024 3062.68 514.865 2837.65 514.865H2580.2L2276.98 1584.64H2528.71C2688.9 1584.64 2814.76 1546.5 2906.3 1470.23C3001.65 1390.14 3077.93 1249.02 3135.14 1046.89ZM2717.51 2728.78C2744.2 2637.25 2757.55 2553.35 2757.55 2477.07C2757.55 2271.13 2639.32 2168.15 2402.85 2168.15H2116.79L1790.69 3295.14H2082.47C2246.47 3295.14 2378.06 3255.09 2477.22 3175C2576.39 3091.1 2656.48 2942.36 2717.51 2728.78Z"
                fill="white"
              />
            </svg>
          </HomeLogoLink>
          {isAuthenticated && userData ? (
            <ActionBtn onClick={logout}>Logout</ActionBtn>
          ) : (
            <ActionBtn onClick={loginWithPopup}>Login</ActionBtn>
          )}
        </Nav>
        <Routes>
          {isAuthenticated && userData && (
            <>
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
                    tvGenresData={tvGenresData}
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
                    tvGenresData={tvGenresData}
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
                    tvGenresData={tvGenresData}
                  />
                }
              />
            </>
          )}
        </Routes>
      </Router>
    </Main>
  );
};

const Nav = styled.nav`
  padding: 24px;
  display: flex;
  justify-content: space-between;
`;

const HomeLogoLink = styled(Link)``;
const Main = styled.main`
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1636955779321-819753cd1741?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80");
  background-repeat: no-repeat;
  background-size: cover;
`;

const ActionBtn = styled.button`
  padding: 8px 12px;
`;

export default App;
