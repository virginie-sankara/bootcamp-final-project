import { Link, Route, Routes } from "react-router-dom";

const Home = ({ user, loginWithPopup, logout }) => {
  return (
    <>
      {user ? (
        <>
          <p>{user.email}</p>
          <button onClick={logout}>Logout</button>
          <div>
            <Link to="/form">
              <button>Generate A New Suggestion</button>
            </Link>
          </div>
          <div>
            <Link to="">
              <button>Invitations received</button>
            </Link>
          </div>
          <div>
            <Link to="">
              <button>Invitations sent</button>
            </Link>
          </div>
        </>
      ) : (
        <button onClick={loginWithPopup}>Login</button>
      )}
    </>
  );
};

export default Home;
