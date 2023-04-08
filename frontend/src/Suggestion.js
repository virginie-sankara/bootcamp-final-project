import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Suggestion = ({
  userData,
  completedMatches,
  movieGenresData,
  tvGenresData,
}) => {
  const { matchId } = useParams();
  console.log("MATCHID" + matchId);

  const suggestionDetails = completedMatches
    .filter((match) => match._id === matchId)
    .map((match) => match.suggestion);

  // Stretch : Add genres

  return (
    <>
      <div>
        {suggestionDetails.map((suggestion) => {
          const year = suggestion.release_date.split("-")[0];
          return (
            <StyledSuggestion key={suggestion.id}>
              <h2>{suggestion.title}</h2>
              <Poster
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  suggestion.poster_path
                }
              />

              <p>{year}</p>
              <p>{suggestion.vote_average}</p>
              <p>{suggestion.original_language.toUpperCase()}</p>
              <p>{suggestion.overview}</p>
            </StyledSuggestion>
          );
        })}
      </div>
    </>
  );
};

const Poster = styled.img`
  width: 300px;
`;

const StyledSuggestion = styled.div``;

export default Suggestion;
