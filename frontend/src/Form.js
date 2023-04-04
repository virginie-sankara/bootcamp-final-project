import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Input from "./Input";

const Form = ({ userData, handleSubmit }) => {
  const [formData1, setformData1] = useState({});
  const [partner, setPartner] = useState("");
  const [movieGenresData, setMovieGenresData] = useState([]);
  const [tvGenresData, setTvGenresData] = useState([]);

  // Get : Movie genres
  useEffect(() => {
    fetch("/get-movie-genres")
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 400 || response.status === 500) {
          throw new Error(response.message);
        } else {
          setMovieGenresData(response.movieGenres);
          console.log(response.movieGenres);
        }
      });
  }, []);

  // Get : Tv genres
  useEffect(() => {
    fetch("/get-tv-genres")
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 400 || response.status === 500) {
          throw new Error(response.message);
        } else {
          setTvGenresData(response.tvGenres);
          console.log(response.tvGenres);
        }
      });
  }, []);

  const navigate = useNavigate();

  const handlePartnerChange = (e) => {
    setPartner(e.target.value);
    console.log(e.target.value);
  };

  const handleChange = (name, value) => {
    console.log(name, value);
    setformData1({
      ...formData1,
      [name]: value,
    });
  };

  return (
    <>
      <StyledForm onSubmit={(e) => handleSubmit(e, formData1)}>
        <label>
          Pick your partner:
          <select onChange={handlePartnerChange}>
            <option name="partner" value="">
              Select a partner
            </option>
            {userData.friends.map((friend) => {
              return (
                //  Verify : Is this okay ? change for username
                <option key={friend.email} name="partner" value={friend.email}>
                  {friend.username}
                </option>
              );
            })}
          </select>
        </label>
        <div>
          <Link to="/">Next</Link>
        </div>
        {!formData1.type && (
          <div>
            <h2>Media</h2>
            <Input
              type="radio"
              value="movie"
              name="type"
              handleChange={handleChange}
            />
            Movie
            <Input
              type="radio"
              value="tv"
              name="type"
              handleChange={handleChange}
            />
            TV Show
          </div>
        )}
        <div>
          <Link to="/">Next</Link>
        </div>
        {formData1.type && (
          <>
            <h2>Genre</h2>
            {formData1.type === "movie" &&
              movieGenresData.map((genre) => {
                return (
                  <label key={genre._id}>
                    <Input
                      type="checkbox"
                      value={genre._id}
                      name="genre"
                      handleChange={handleChange}
                    />
                    {genre.name}
                  </label>
                );
              })}
            {formData1.type === "tv" &&
              tvGenresData.map((genre) => {
                return (
                  <label key={genre._id}>
                    <Input
                      type="checkbox"
                      value={genre._id}
                      name="genre"
                      handleChange={handleChange}
                    />
                    {genre.name}
                  </label>
                );
              })}
          </>
        )}

        {(formData1.genre && formData1.type === "movie" && (
          <>
            <h2>Length (movie)</h2>
            <label>
              <Input
                type="checkbox"
                value="30"
                name="type"
                handleChange={handleChange}
              />
              0-60 min
            </label>
            <label>
              <Input
                type="checkbox"
                value="60"
                name="type"
                handleChange={handleChange}
              />
              60-90 min
            </label>
            <label>
              <Input
                type="checkbox"
                value="90"
                name="type"
                handleChange={handleChange}
              />
              +90 min
            </label>
          </>
        )) ||
          (formData1.type === "tv" && (
            <>
              <h2>Length (tv)</h2>
              <label>
                <Input
                  type="checkbox"
                  value="30"
                  name="type"
                  handleChange={handleChange}
                />
                0-30 min
              </label>
              <label>
                <Input
                  type="checkbox"
                  value="60"
                  name="type"
                  handleChange={handleChange}
                />
                +30-60 min
              </label>
              <label>
                <Input
                  type="checkbox"
                  value="200"
                  name="type"
                  handleChange={handleChange}
                />
                +60 min
              </label>
            </>
          ))}

        <div>
          <Link to="/">Next</Link>
        </div>
        <Submit type="submit">Confirm</Submit>
      </StyledForm>
    </>
  );
};

const Submit = styled.button`
  background-color: #d1560e;
  border: none;
  margin-top: 5px;
  border-radius: 2px;

  &:disabled {
    color: orange;
  }
`;

const StyledForm = styled.form`
  margin-top: 24px;
  border: 5px solid blue;
  padding: 30px;
  margin: auto 0px auto;
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

export default Form;
