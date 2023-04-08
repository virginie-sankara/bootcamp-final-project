import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const CompletedMatches = ({ userData, completedMatches }) => {
  return (
    <>
      {completedMatches.map((match) => {
        <div key={match._id}>
          <p>{match.creationDate}</p>
          <img>{match.suggestion.overview}</img>
        </div>;
      })}
    </>
  );
};
export default CompletedMatches;
