import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

const Form = ({ userData }) => {
  const navigate = useNavigate();
  //SET formData1
  const [formData1, setFormData1] = useState({
    host: userData.email,
    hostUsername: userData.username,
    partner: null,
    partnerUsername: null,
    type: "",
    genre: [],
    length: "",
  });

  // RENDER div above each other
  const [renderDivType, setRenderDivType] = useState(false);
  const [renderDivGenre, setRenderDivGenre] = useState(false);
  const [renderDivLength, setRenderDivLength] = useState(false);

  // FETCH movie + tv genres
  const [movieGenresData, setMovieGenresData] = useState([]);
  const [tvGenresData, setTvGenresData] = useState([]);

  //   GET : Movie + TV genres
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
    setFormData1({
      ...formData1,
      [name]: value,
    });
  };

  const handleSubmit = (e, formData1) => {
    e.preventDefault();

    //  POST info to server
    fetch("/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 400 || data.status === 404 || data.status === 500) {
          console.log(data);
          throw new Error(data.message);
        }
        console.log(data);
        console.log("Success", data.data);
        navigate(`/confirmation/${data.newMatchData.insertedId}`);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <>
      <StyledForm onSubmit={(e) => handleSubmit(e, formData1)}>
        {/* DIV PARTNER */}
        <DivPartner>
          <h2>Pick your partner</h2>
          {userData.friends.map((friend) => (
            <label key={friend.email}>
              <Input
                type="radio"
                name="partner"
                onClick={() => {
                  setFormData1({
                    ...formData1,
                    partner: friend.email,
                    partnerUsername: friend.username,
                  });
                }}
              />
              {friend.username}
              <FriendAvatar
                src={friend.avatarSrc}
                alt={`Avatar for ${friend.username}`}
              />
            </label>
          ))}
          {/* // Button next that would render next div above the last */}
          {formData1.partner && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setRenderDivType(true);
              }}
            >
              Next
            </button>
          )}
        </DivPartner>

        {/* DIV TYPE */}
        {renderDivType === true && (
          <DivType>
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
            {/* // Button next that would render next div above the last */}
            {formData1.type && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setRenderDivGenre(true);
                }}
              >
                Next
              </button>
            )}
          </DivType>
        )}

        {/* DIV GENRE */}
        {renderDivGenre === true && (
          <DivGenre>
            <h2>Genres</h2>
            {formData1.genre.length >= 3 && (
              <p>You've reached the maximum choices allowed</p>
            )}

            {/* if formData1.type === "movie" */}
            {formData1.type === "movie" &&
              movieGenresData.map((genre) => {
                console.log(typeof formData1.genre);
                const isChecked = formData1.genre.includes(genre._id);
                // set max checkboxes to 3
                const isDisabled = formData1.genre.length >= 3 && !isChecked;

                return (
                  <label key={genre._id}>
                    <Input
                      type="checkbox"
                      name="genre"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={(e) => {
                        let res = null;
                        if (isChecked) {
                          res = formData1.genre.filter((e) => e !== genre._id);
                        } else {
                          res = [...formData1.genre, genre._id];
                        }
                        handleChange(e.target.name, res);
                      }}
                    />
                    {genre.name}
                  </label>
                );
              })}

            {/* if formData1.type === "tv" */}
            {formData1.type === "tv" &&
              tvGenresData.map((genre) => {
                const isChecked = formData1.genre.includes(genre._id);
                // Set max checkboxes to 3
                const isDisabled = formData1.genre.length >= 3 && !isChecked;

                return (
                  <label key={genre._id}>
                    <Input
                      type="checkbox"
                      name="genre"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={(e) => {
                        let res = null;
                        if (isChecked) {
                          res = formData1.genre.filter((e) => e !== genre._id);
                        } else {
                          res = [...formData1.genre, genre._id];
                        }
                        handleChange(e.target.name, res);
                      }}
                    />
                    {genre.name}
                  </label>
                );
              })}
            {/* // Button next that would render next div above the last */}
            {formData1.genre.length >= 1 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setRenderDivLength(true);
                }}
              >
                Next
              </button>
            )}
          </DivGenre>
        )}

        {/* DIV LENGTH */}
        {renderDivLength === true && (
          <DivLength>
            <h2>Max length </h2>
            {formData1.type === "movie" && (
              <>
                <label>
                  <Input
                    type="radio"
                    name="length"
                    onChange={(e) => handleChange(e.target.name, "30")}
                  />
                  30 min
                </label>
                <label>
                  <Input
                    type="radio"
                    name="length"
                    onChange={(e) => handleChange(e.target.name, "60")}
                  />
                  60 min
                </label>
                <label>
                  <Input
                    type="radio"
                    name="length"
                    onChange={(e) => handleChange(e.target.name, "90")}
                  />
                  90 min
                </label>
                <label>
                  <Input
                    type="radio"
                    name="length"
                    onChange={(e) => handleChange(e.target.name, "120")}
                  />
                  120 min
                </label>
                <label>
                  <Input
                    type="radio"
                    name="length"
                    onChange={(e) => handleChange(e.target.name, "300")}
                  />
                  I've got all the time
                </label>
              </>
            )}
            {formData1.type === "tv" && (
              <>
                <label>
                  <Input
                    type="radio"
                    name="length"
                    onChange={(e) => handleChange(e.target.name, "20")}
                  />
                  20 min
                </label>
                <label>
                  <Input
                    type="radio"
                    name="length"
                    onChange={(e) => handleChange(e.target.name, "30")}
                  />
                  30 min
                </label>
                <label>
                  <Input
                    type="radio"
                    name="length"
                    onChange={(e) => handleChange(e.target.name, "60")}
                  />
                  60 min
                </label>
                <label>
                  <Input
                    type="radio"
                    name="length"
                    onChange={(e) => handleChange(e.target.name, "120")}
                  />
                  120 min
                </label>
                <label>
                  <Input
                    type="radio"
                    name="length"
                    onChange={(e) => handleChange(e.target.name, "300")}
                  />
                  I've got all the time
                </label>
              </>
            )}
          </DivLength>
        )}

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

const DivPartner = styled.div``;
const DivType = styled.div``;
const DivGenre = styled.div``;
const DivLength = styled.div``;

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
