import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = ({ userData }) => {
  return (
    <HomeWrapper>
      <TextWrapper>
        <h2>Nice to see you back {userData.firstName} !</h2>
        <Buttons>
          <Start to="/form">Start</Start>
          <SecondaryBtn area="invite" to="/invitations">
            Invitations
          </SecondaryBtn>
          <SecondaryBtn
            to={`/completed-matches/${userData.email}`}
            area="result"
          >
            Results
          </SecondaryBtn>
        </Buttons>
      </TextWrapper>
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.div`
  border-radius: 20px;
  padding: 20px;
  max-width: 600px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Buttons = styled.div`
  display: grid;
  grid-template-areas:
    "start start"
    "invite result";
  gap: 8px;
`;

const Start = styled(Link)`
  border-radius: 18px;
  background: white;
  color: black;
  padding: 8px 16px;
  max-width: 100%;
  display: block;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  border: 1px solid transparent;
  font-size: 22px;

  grid-area: start;

  &:hover {
    background-color: transparent;
    color: white;
    border-color: white;
  }
`;

const SecondaryBtn = styled(Link)`
  grid-area: ${(props) => props.area};
  padding: 8px 16px;
  border: 1px solid white;
  color: white;
  border-radius: 18px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  text-decoration: none;

  &:hover {
    background-color: white;
    color: black;
  }
`;

export default Home;
