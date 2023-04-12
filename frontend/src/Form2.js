import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { genresObject } from "./helper";
import InvitationBackground from "./assets/InvitationBackground.png";

// import { Link } from "react-router-dom";

const Form2 = ({ userData, movieGenresData, tvGenresData }) => {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const [step, setStep] = useState(1);
  const [formData1, setFormData1] = useState(null);
  const [formData2, setFormData2] = useState({
    genre: [],
    length: "",
  });

  //   GET : Match to complete
  useEffect(() => {
    fetch(`/match/${matchId}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 400 || response.status === 500) {
          throw new Error(response.message);
        } else {
          setFormData1(response.match);
          console.log("formData1 here" + formData1);
          // console.log(response.match);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  // console.log("formData2", formData2);

  // GET genres names

  const genresNames =
    tvGenresData && movieGenresData
      ? genresObject([...movieGenresData, ...tvGenresData])
      : {};

  // console.log(tvGenresData);
  // console.log("genreNames", genresNames);

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

  console.log({ formData1 });

  return (
    formData1 && (
      <PageWrapper>
        <PageTitle>Match info</PageTitle>
        <TextWrapper>
          <InfoTitle>
            Host : <span> {formData1.hostUsername}</span>
          </InfoTitle>

          <InfoTitle>
            Media type : {formData1.type === "tv" && <span> TV Show</span>}
            {formData1.type === "movie" && <span> Movie</span>}
          </InfoTitle>

          <InfoTitle>
            Genre(s) : {""}{" "}
            {formData1.formData1.genre.map((id) => {
              return <span key={id}> {genresNames[id]} </span>;
            })}
          </InfoTitle>

          <Line />

          <StyledForm onSubmit={(e) => handleSubmit(e, formData2)}>
            {/* DIV GENRE */}
            {step === 1 && (
              <DivGenre>
                <SectionName>Genres</SectionName>
                {formData2.genre.length >= 3 && (
                  <p>You've reached the maximum choices allowed</p>
                )}

                <GenreContent>
                  {/* if formData1.type === "movie" */}
                  {formData1.type === "movie" &&
                    movieGenresData.map((genre) => {
                      const isChecked = formData2.genre.includes(genre._id);
                      // set max checkboxes to 3
                      const isDisabled =
                        formData2.genre.length >= 3 && !isChecked;

                      return (
                        <GenreInputs key={genre._id}>
                          <label key={genre._id}>
                            <Input
                              type="checkbox"
                              name="genre"
                              checked={isChecked}
                              disabled={isDisabled}
                              onChange={(e) => {
                                let res = null;
                                if (isChecked) {
                                  res = formData2.genre.filter(
                                    (e) => e !== genre._id
                                  );
                                } else {
                                  res = [...formData2.genre, genre._id];
                                }
                                handleChange(e.target.name, res);
                              }}
                            />
                            {genre.name}
                          </label>
                        </GenreInputs>
                      );
                    })}
                  {/* if formData1.type === "tv" */}
                  {formData1.type === "tv" &&
                    tvGenresData.map((genre) => {
                      const isChecked = formData2.genre.includes(genre._id);
                      // Set max checkboxes to 3
                      const isDisabled =
                        formData2.genre.length >= 3 && !isChecked;

                      return (
                        <GenreInputs key={genre._id}>
                          <label key={genre._id}>
                            <Input
                              type="checkbox"
                              name="genre"
                              checked={isChecked}
                              disabled={isDisabled}
                              onChange={(e) => {
                                let res = null;
                                if (isChecked) {
                                  res = formData1.genre.filter(
                                    (e) => e !== genre._id
                                  );
                                } else {
                                  res = [...formData2.genre, genre._id];
                                }
                                handleChange(e.target.name, res);
                              }}
                            />
                            {genre.name}
                          </label>
                        </GenreInputs>
                      );
                    })}
                </GenreContent>

                {/* // Button next that would render next div above the last */}
                {formData2.genre.length >= 1 && (
                  <NextContainer>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setStep(2);
                      }}
                    >
                      Next
                    </button>
                  </NextContainer>
                )}
              </DivGenre>
            )}

            {/* DIV LENGTH */}
            {step === 2 && (
              <DivLength>
                <SectionName>Max length </SectionName>
                {formData1.type === "movie" && (
                  <LengthInputs>
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
                  </LengthInputs>
                )}
                {formData1.type === "tv" && (
                  <LengthInputs>
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
                  </LengthInputs>
                )}
              </DivLength>
            )}

            {formData2.genre.length >= 1 && formData2.length !== "" && (
              <Submit type="submit">Confirm</Submit>
            )}
          </StyledForm>
        </TextWrapper>
      </PageWrapper>
    )
  );
};

const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1636955779321-819753cd1741?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const TextWrapper = styled.div`
  padding: 30px;
  background-image: url(${InvitationBackground});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px;
  border: white solid 1px;
  width: 50vw;
`;

const PageTitle = styled.h1`
  font-size: 60px;
`;

const InfoTitle = styled.h1`
  font-size: 18px;
`;

const SectionName = styled.h2`
  font-size: 30px;
`;

const Line = styled.div`
  border-bottom: 0.5px solid white;
  margin-top: 20px;
`;

const Submit = styled.button`
  background-color: transparent;
  font-family: "Prata", serif;
  padding: 15px;
  border: white 1px solid;
  border-radius: 25px;
  color: white;
  text-align: center;
  margin-top: 3vh;
  margin-bottom: 3vh;
  width: 100%;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const StyledForm = styled.form``;

const DivGenre = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
`;

const GenreContent = styled.div``;

const GenreInputs = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const DivLength = styled.div``;

const LengthInputs = styled.div`
display: flex;
flex-direction: row:
gap: 20px;
justify-content: space-between;`;

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

const NextContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default Form2;
