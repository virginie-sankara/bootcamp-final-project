import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = ({ userData }) => {
  return (
    <HomeWrapper>
      <TextWrapper>
        <h2>Nice to see you back {userData.firstName} !</h2>
        <div>
          <Link to="/form">
            <button>Start</button>
          </Link>
        </div>
        <div>
          <Link to="/invitations">
            <button>Invitations</button>
          </Link>
        </div>
        <div>
          <Link to={`/completed-matches/${userData.email}`}>
            <button>Results</button>
          </Link>
        </div>
      </TextWrapper>
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1636955779321-819753cd1741?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.div`
  //   border: 2px solid white;
  border-radius: 5%;
  padding: 20px;
  max-width: 600px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

export default Home;
