import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

// import { Link } from "react-router-dom";

const Form2 = ({ userData }) => {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const [step, setStep] = useState(1);
  const [formData1, setFormData1] = useState([]);
  const [formData2, setFormData2] = useState({
    genre: [],
    length: "",
  });
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

  //   GET : Match to complete
  useEffect(() => {
    fetch(`/match/${matchId}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 400 || response.status === 500) {
          throw new Error(response.message);
        } else {
          setFormData1(response.match);
          console.log("formData1 here");
          console.log(response.match);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  console.log(formData2);
  console.log("test");

  const handleChange = (name, value) => {
    // console.log(name, value);
    // console.log("valeur is " + typeof value);
    setFormData2({
      ...formData2,
      [name]: value,
    });
  };

  const handleSubmit = (e, formData1) => {
    e.preventDefault();

    //  PATCH existing match
    fetch(`/match/${matchId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: matchId, formData2 }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 400 || data.status === 404 || data.status === 500) {
          console.log(data);
          throw new Error(data.message);
        }
        console.log(data);
        console.log("Success", data.data);
        navigate(`/confirmation/${matchId}`);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <>
      <h2>Match info</h2>
      <p>
        Creator : <span>{formData1.hostUsername}</span>
      </p>
      <p>
        Media type : {formData1.type === "tv" && <span>TV Show</span>}
        {formData1.type === "movie" && <span>Movie</span>}
      </p>
      <h2>Time to make your choices</h2>
      <StyledForm onSubmit={(e) => handleSubmit(e, formData2)}>
        {/* DIV GENRE */}
        <DivGenre>
          <h2>Genres</h2>
          {formData2.genre.length >= 3 && (
            <p>You've reached the maximum choices allowed</p>
          )}

          {/* if formData1.type === "movie" */}
          {formData1.type === "movie" &&
            movieGenresData.map((genre) => {
              const isChecked = formData2.genre.includes(genre._id);
              // set max checkboxes to 3
              const isDisabled = formData2.genre.length >= 3 && !isChecked;

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
                        res = formData2.genre.filter((e) => e !== genre._id);
                      } else {
                        res = [...formData2.genre, genre._id];
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
              const isChecked = formData2.genre.includes(genre._id);
              // Set max checkboxes to 3
              const isDisabled = formData2.genre.length >= 3 && !isChecked;

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
                        res = [...formData2.genre, genre._id];
                      }
                      handleChange(e.target.name, res);
                    }}
                  />
                  {genre.name}
                </label>
              );
            })}
          {/* // Button next that would render next div above the last */}
          {formData2.genre.length >= 1 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setStep(2);
              }}
            >
              Next
            </button>
          )}
        </DivGenre>

        {/* DIV LENGTH */}
        {step === 2 && (
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

        {formData2.genre.length >= 1 && formData2.length !== "" && (
          <Submit type="submit">Confirm</Submit>
        )}
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

export default Form2;
