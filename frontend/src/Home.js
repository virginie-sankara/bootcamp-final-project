import { Link } from "react-router-dom";

const Home = ({ user, userData, loginWithPopup, logout }) => {
  return (
    <>
      {user ? (
        <>
          <p>Nice to see you back {userData.firstName} !</p>

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
