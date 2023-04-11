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
  const [matchData, setMatchData] = useState(null);
  const [suggestionDetails, setSuggestionDetails] = useState(null);

  useEffect(() => {
    fetch(`/match/${matchId}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 400 || response.status === 500) {
          throw new Error(response.message);
        } else {
          setMatchData(response.match);
          setSuggestionDetails(response.match.suggestion);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [matchId]);

  const genresNames =
    tvGenresData && movieGenresData
      ? genresObject([...movieGenresData, ...tvGenresData])
      : {};

  console.log(suggestionDetails);

  return (
    <>
      {suggestionDetails ? (
        <StyledSuggestion key={suggestionDetails.id}>
          {suggestionDetails.title ? (
            <h2>{suggestionDetails.title}</h2>
          ) : (
            <h2>{suggestionDetails.name}</h2>
          )}
          {suggestionDetails.release_date && (
            <Year>{suggestionDetails.release_date.split("-")[0]}</Year>
          )}
          <SuggestionWrapper>
            {suggestionDetails.poster_path ? (
              <Poster
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  suggestionDetails.poster_path
                }
                alt="Movie or TV show poster"
              />
            ) : (
              <p>No poster</p>
            )}
            <SuggestionInfo>
              <p>GENRE </p>
              {suggestionDetails.genre_ids.map((id) => {
                return <span key={id}>{genresNames[id]} </span>;
              })}
              <p>VOTE AVERAGE </p>{" "}
              <span> {suggestionDetails.vote_average}</span>
              <p>ORIGINAL LANGUAGE </p>
              <span>{suggestionDetails.original_language.toUpperCase()}</span>
              {suggestionDetails.overview !== "" ? (
                <p>{suggestionDetails.overview}</p>
              ) : (
                <p>No description available</p>
              )}
            </SuggestionInfo>
          </SuggestionWrapper>
        </StyledSuggestion>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

const Poster = styled.img`
  width: 300px;
`;

const StyledSuggestion = styled.div`
  margin: 0px;
  padding: 0px;
  width: 100vw;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1636955779321-819753cd1741?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SuggestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: white 1px solid;
`;

const SuggestionInfo = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 15px;
  width: 40vw;
  padding-left: 2vw;
  align-items: center;
`;

const Year = styled.div`
  margin-top: -3vh;
  margin-bottom: 4vh;
  font-size: 25px;
`;

export default Suggestion;
