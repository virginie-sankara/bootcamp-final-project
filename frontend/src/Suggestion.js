import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Suggestion = ({
  userData,
  completedMatches,
  movieGenresData,
  tvGenresData,
}) => {
  const { matchId } = useParams();

  const suggestionDetails = completedMatches
    .filter((match) => match._id === matchId)
    .map((match) => match.suggestion);

  // Stretch : Add genres

  return (
    <>
      <h2>Match result</h2>
      <div>
        {suggestionDetails.map((suggestion) => (
          <StyledSuggestion key={suggestion.id}>
            <Poster
              src={
                "https://image.tmdb.org/t/p/original/" + suggestion.poster_path
              }
            />
            <h2>{suggestion.title}</h2>
            <p>{suggestion.release_date}</p>
            <p>{suggestion.vote_average}</p>
            <p>{suggestion.original_language}</p>
            <p>{suggestion.overview}</p>
          </StyledSuggestion>
        ))}
      </div>
    </>
  );
};

const Poster = styled.img`
  width: 300px;
`;

const StyledSuggestion = styled.div``;

export default Suggestion;
