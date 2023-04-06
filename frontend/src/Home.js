import { Link } from "react-router-dom";

const Home = ({ userData }) => {
  // GET

  return (
    <>
      <p>Nice to see you back {userData.firstName} !</p>
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
          <button>View suggestions</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
