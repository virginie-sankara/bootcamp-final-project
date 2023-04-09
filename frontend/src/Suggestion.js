import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Suggestion = ({
  userData,
  completedMatches,
  movieGenresData,
  tvGenresData,
}) => {
  const { matchId } = useParams();
  console.log("MATCHID" + matchId);

  const [suggestionDetails, setSuggestionDetails] = useState(null);

  useEffect(() => {
    if (completedMatches) {
      const details = completedMatches
        .filter((match) => match._id === matchId)
        .map((match) => match.suggestion);
      setSuggestionDetails(details[0]);
    }
  }, [completedMatches, matchId]);

  if (!suggestionDetails) {
    return <div>Loading...</div>;
  }

  console.log(suggestionDetails);

  // Stretch : Add genres

  return (
    <>
      <StyledSuggestion key={suggestionDetails.id}>
        <h2>{suggestionDetails.title}</h2>
        <Poster
          src={
            "https://image.tmdb.org/t/p/original/" +
            suggestionDetails.poster_path
          }
        />

        <p>{suggestionDetails.release_date.split("-")[0]}</p>
        <p>{suggestionDetails.vote_average}</p>
        <p>{suggestionDetails.original_language.toUpperCase()}</p>
        <p>{suggestionDetails.overview}</p>
      </StyledSuggestion>
    </>
  );
};

const Poster = styled.img`
  width: 300px;
`;

const StyledSuggestion = styled.div``;

export default Suggestion;
