import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
            <p>
              {new Date(match.creationDate).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
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
  -webkit-filter: blur(20px);
`;
export default CompletedMatches;
