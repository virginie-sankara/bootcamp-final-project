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
  const [suggestionDetails, setSuggestionDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/match/${matchId}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 400 || response.status === 500) {
          throw new Error(response.message);
        } else {
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
    <PageWrapper>
      {suggestionDetails ? (
        <StyledSuggestion key={suggestionDetails.id}>
          {suggestionDetails.title ? (
            <h2>
              {suggestionDetails.title}
              {suggestionDetails.release_date && (
                <span>
                  {" "}
                  ( {suggestionDetails.original_language.toUpperCase()} )
                </span>
              )}
            </h2>
          ) : (
            <h2>{suggestionDetails.name}</h2>
          )}
          {suggestionDetails.release_date && (
            <Year>{suggestionDetails.release_date.split("-")[0]}</Year>
          )}
          <SuggestionWrapper>
            {suggestionDetails.poster_path && (
              <Poster
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  suggestionDetails.poster_path
                }
                alt="Movie or TV show poster"
              />
            )}
            <SuggestionInfo>
              <p>Genre(s) :</p>
              {suggestionDetails.genre_ids.map((id) => {
                return <span key={id}> • {genresNames[id]} </span>;
              })}

              {suggestionDetails.vote_average &&
                suggestionDetails.vote_average !== 0 && (
                  <Vote> {suggestionDetails.vote_average} / 10</Vote>
                )}
              {suggestionDetails.overview !== "" ? (
                <p>{suggestionDetails.overview}</p>
              ) : (
                <p>No description available</p>
              )}
            </SuggestionInfo>
          </SuggestionWrapper>

          <button onClick={() => navigate("/form")}>Start over</button>
        </StyledSuggestion>
      ) : (
        <p>Loading...</p>
      )}
    </PageWrapper>
  );
};

const Poster = styled.img`
  width: 300px;
`;

const PageWrapper = styled.div`
  margin: 0px;
  padding: 0px;
  width: 100vw;
  min-height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1636955779321-819753cd1741?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80");
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledSuggestion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SuggestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: rgba(255, 255, 255, 0.5) 1px solid;
  margin-bottom: 4vh;
`;

const SuggestionInfo = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 28px;
  width: 40vw;
  padding-left: 2vw;
  padding-right: 1vw;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Year = styled.div`
  margin-top: -3vh;
  margin-bottom: 4vh;
  font-size: 25px;
`;

const Vote = styled.p`
  font-size: 65px;
  margin: 32px 0;
`;

export default Suggestion;
