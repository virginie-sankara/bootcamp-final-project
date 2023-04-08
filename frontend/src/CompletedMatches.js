import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Suggestion from "./Suggestion";

const CompletedMatches = ({ userData, completedMatches }) => {
  const navigate = useNavigate();
  // SORT : matches from most recent to less recent
  const [sortedMatches, setSortedMatches] = useState([]);

  useEffect(() => {
    const sorted = [...completedMatches].sort(
      (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
    );
    setSortedMatches(sorted);
  }, [completedMatches]);

  return (
    <>
      {sortedMatches.map((match) => {
        return (
          <div
            key={match._id}
            onClick={() => {
              navigate(`/match-result/${match._id}`);
            }}
          >
            <p>{match.creationDate}</p>
            <Poster
              src={
                "https://image.tmdb.org/t/p/original/" +
                match.suggestion.backdrop_path
              }
            />
          </div>
        );
      })}
    </>
  );
};

const Poster = styled.img`
  width: 100vw;

  filter: blur(8px);
  -webkit-filter: blur(8px);
`;
export default CompletedMatches;
