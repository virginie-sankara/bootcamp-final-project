// TO_DO : Add host avatar

import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CompletedMatches = ({ userData, completedMatches }) => {
  const navigate = useNavigate();
  // SORT : matches from most recent to less recent
  const [sortedMatches, setSortedMatches] = useState([]);

  useEffect(() => {
    if (Array.isArray(completedMatches)) {
      const sorted = [...completedMatches].sort(
        (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
      );
      setSortedMatches(sorted);
    }
  }, [completedMatches]);

  console.log("Completed matches", completedMatches);
  console.log(userData);

  return (
    <ComponentWrapper>
      <PageTitle>Matches results</PageTitle>
      {Array.isArray(sortedMatches) &&
        sortedMatches.map((match) => {
          return (
            <Match
              key={match._id}
              onClick={() => {
                navigate(`/match-result/${match._id}`);
              }}
            >
              {match.suggestion.backdrop_path && (
                <BackdropImg
                  src={
                    "https://image.tmdb.org/t/p/original/" +
                    match.suggestion.backdrop_path
                  }
                />
              )}
              <MatchContent>
                <MatchHeader>
                  <MatchDate>
                    {new Date(match.creationDate).toLocaleString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </MatchDate>
                </MatchHeader>
                <MediaType>{match.type}</MediaType>
              </MatchContent>
            </Match>
          );
        })}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  background-image: url("https://images.unsplash.com/photo-1636955779321-819753cd1741?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-size: 60px;
`;

const BackdropImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  transition: filter 0.4s ease-in-out;
`;

const Match = styled.div`
  position: relative;
  width: 80vw;
  height: 200px;
  margin-top: 2vh;
  border-radius: 25px;
  border: solid white 1px;
  padding: 10px;
  overflow: hidden;

  & ${BackdropImg} {
    -webkit-filter: blur(10px);
    filter: blur(10px);
  }

  &:hover {
    & ${BackdropImg} {
      -webkit-filter: blur(3px);
      filter: blur(3px);
    }
  }
`;

const MatchContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const MatchHeader = styled.div`
  display: flex;
  width: 80vw;
  justify-content: space-between;
`;

// STRETCH

// const AvatarsDiv = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 10px;
// `;
// const UserAvatar = styled.img`
//   display: flex;
//   height: 30px;
//   width: 30px;
//   border-radius: 50%;
//   object-fit: cover;
//   justify-content: center;
// `;

const MatchDate = styled.p`
  font-size: 10px;
  margin-left: 1vw;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 3px;

  text-align: center;
`;

const MediaType = styled.p`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: auto;
  font-size: 50px;
  background-color: rgba(0, 0, 0, 0.1);
  width: 15vw;
`;

export default CompletedMatches;
