import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Form = ({ user, userData, handleSubmit }) => {
  const [formData1, setFormData1] = useState({
    partners: null,
    type: "",
    genre: [],
    length: [],
  });

  const [movieGenresData, setMovieGenresData] = useState([]);
  const [tvGenresData, setTvGenresData] = useState([]);

  useEffect(() => {
    Promise.all([fetch("/get-movie-genres"), fetch("/get-tv-genres")])
      .then(([movieGenresRes, tvGenresRes]) =>
        Promise.all([movieGenresRes.json(), tvGenresRes.json()])
      )
      .then(([movieGenres, tvGenres]) => {
        if (
          movieGenres.status === 400 ||
          movieGenres.status === 500 ||
          tvGenres.status === 400 ||
          tvGenres.status === 500
        ) {
          throw new Error(`${movieGenres.message}, ${tvGenres.message}`);
        } else {
          setMovieGenresData(movieGenres.movieGenres);
          console.log(movieGenres);
          setTvGenresData(tvGenres.tvGenres);
        }
      });
  }, []);

  console.log(formData1);
  console.log("test");

  const handleChange = (name, value) => {
    setFormData1((formData1) => ({
      ...formData1,
      [name]: value,
    }));
  };

  return (
    <>
      <StyledForm onSubmit={(e) => handleSubmit(e, formData1)}>
        <div>
          <h2>Pick your partner</h2>
          {userData.friends.map((friend) => (
            <label key={friend.email}>
              <Input
                type="radio"
                name="partners"
                checked={formData1.partners === friend.email}
                onChange={(e) => handleChange(e.target.name, friend.email)}
              />
              {friend.username}
              <FriendAvatar
                src={friend.avatarSrc}
                alt={`Avatar for ${friend.username}`}
              />
            </label>
          ))}
        </div>
        <div>
          <Link to="/">Next</Link>
        </div>
        {formData1.partner !== "" && (
          <div>
            <h2>Media</h2>
            <label>
              <Input
                type="radio"
                value="movie"
                name="type"
                checked={formData1.type === "movie"}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              Movie
            </label>
            <label>
              <Input
                type="radio"
                value="tv"
                name="type"
                checked={formData1.type === "tv"}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              TV Show
            </label>
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
                      name="genre"
                      checked={formData1.genre.includes(genre._id)}
                      onChange={(e) =>
                        handleChange(e.target.name, [
                          ...formData1.genre,
                          genre._id,
                        ])
                      }
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
                      checked={formData1.genre.includes(genre._id)}
                      onChange={(e) =>
                        handleChange(e.target.name, [
                          ...formData1.genre,
                          e.target.value,
                        ])
                      }
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
                onChange={handleChange}
              />
              0-60 min
            </label>
            <label>
              <Input
                type="checkbox"
                value="60"
                name="type"
                onChange={handleChange}
              />
              60-90 min
            </label>
            <label>
              <Input
                type="checkbox"
                value="90"
                name="type"
                onChange={handleChange}
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
                  onChange={handleChange}
                />
                0-30 min
              </label>
              <label>
                <Input
                  type="checkbox"
                  value="60"
                  name="type"
                  onChange={handleChange}
                />
                +30-60 min
              </label>
              <label>
                <Input
                  type="checkbox"
                  value="200"
                  name="type"
                  onChange={handleChange}
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

const Input = styled.input`
  padding: 4px;
  margin: 5px 0px;
`;

const FriendAvatar = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

export default Form;
