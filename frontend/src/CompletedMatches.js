import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const CompletedMatches = ({ userData, completedMatches }) => {
  return (
    <>
      {completedMatches.map((match) => {
        return (
          <div key={match._id}>
            <p>{match.creationDate}</p>
            <Poster
              src={
                "https://image.tmdb.org/t/p/original/" +
                match.suggestion.poster_path
              }
            />
          </div>
        );
      })}
    </>
  );
};

const Poster = styled.img`
  width: 300px;
`;
export default CompletedMatches;
