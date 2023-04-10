import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { genresObject } from "./helper";

const Suggestion = ({
  userData,
  completedMatches,
  movieGenresData,
  tvGenresData,
}) => {
  const { matchId } = useParams();
  // console.log("MATCHID" + matchId);
  const [matchData, setMatchData] = useState(null);
  const [suggestionDetails, setSuggestionDetails] = useState(null);

  // GET matchData to get suggestionDetails
  useEffect(() => {
    fetch(`/match/${matchId}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 400 || response.status === 500) {
          throw new Error(response.message);
        } else {
          setMatchData(response.match);
          setSuggestionDetails(matchData.suggestion);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [matchId]);

  // GET genres names
  const genresNames =
    tvGenresData && movieGenresData
      ? genresObject([...movieGenresData, ...tvGenresData])
      : {};

  console.log(suggestionDetails);

  return (
    <>
      {!suggestionDetails ? (
        <div>Loading...</div>
      ) : (
        <StyledSuggestion key={suggestionDetails.id}>
          {suggestionDetails.title ? (
            <h2>{suggestionDetails.title}</h2>
          ) : (
            <h2>{suggestionDetails.name}</h2>
          )}
          {suggestionDetails.poster_path ? (
            <Poster
              src={
                "https://image.tmdb.org/t/p/original/" +
                suggestionDetails.poster_path
              }
            />
          ) : (
            // TO_DO : Create a generic image
            <p>No poster</p>
          )}

          {suggestionDetails.release_date && (
            <p>{suggestionDetails.release_date.split("-")[0]}</p>
          )}
          <p>
            Genres :{" "}
            {suggestionDetails.genre_ids.map((id) => {
              return <span key={id}>{genresNames[id]} </span>;
            })}
          </p>
          <p>Vote average : {suggestionDetails.vote_average}</p>
          <p>{suggestionDetails.original_language.toUpperCase()}</p>
          {suggestionDetails.overview !== "" ? (
            <p>{suggestionDetails.overview}</p>
          ) : (
            <p>No description available</p>
          )}
        </StyledSuggestion>
      )}
    </>
  );
};

const Poster = styled.img`
  width: 300px;
`;

const StyledSuggestion = styled.div``;

export default Suggestion;
