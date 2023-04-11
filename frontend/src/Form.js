import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InvitationBackground from "./assets/InvitationBackground.png";
// import { Link } from "react-router-dom";

const Form = ({ userData, movieGenresData, tvGenresData }) => {
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
  const [step, setStep] = useState(1);
  const [renderDivType, setRenderDivType] = useState(false);
  const [renderDivGenre, setRenderDivGenre] = useState(false);
  const [renderDivLength, setRenderDivLength] = useState(false);

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
    <PageWrapper>
      <StyledForm onSubmit={(e) => handleSubmit(e, formData1)}>
        {/* DIV PARTNER */}
        {step === 1 && (
          <DivPartner>
            <h2>Pick your partner</h2>
            {userData.friends.map((friend) => (
              <AvatarDiv key={friend.email}>
                <FriendAvatar
                  src={friend.avatarSrc}
                  alt={`Avatar for ${friend.username}`}
                />
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
                  />{" "}
                  {friend.username}
                </label>
              </AvatarDiv>
            ))}
            {/* // Button next that would render next div above the last */}
            {formData1.partner && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
              >
                Next
              </button>
            )}
          </DivPartner>
        )}

        {/* DIV TYPE */}
        {step === 2 && (
          <DivType>
            <h2>Media</h2>
            <MediaDiv>
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
            </MediaDiv>
            {/* // Button next that would render next div above the last */}
            {formData1.type && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setStep(3);
                }}
              >
                Next
              </button>
            )}
          </DivType>
        )}

        {/* DIV GENRE */}
        {step === 3 && (
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
                            res = [...formData1.genre, genre._id];
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
                const isChecked = formData1.genre.includes(genre._id);
                // Set max checkboxes to 3
                const isDisabled = formData1.genre.length >= 3 && !isChecked;

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
                            res = [...formData1.genre, genre._id];
                          }
                          handleChange(e.target.name, res);
                        }}
                      />
                      {genre.name}
                    </label>
                  </GenreInputs>
                );
              })}
            {/* // Button next that would render next div above the last */}
            {formData1.genre.length >= 1 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setStep(4);
                }}
              >
                Next
              </button>
            )}
          </DivGenre>
        )}

        {/* DIV LENGTH */}
        {step === 4 && (
          <DivLength>
            <h2>Max length </h2>
            {/* PROGRESS BAR */}
            {/* <ProgressBar value={formData1.length} max={300} /> */}
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
            {formData1.length > 20 && <Submit type="submit">Confirm</Submit>}
          </DivLength>
        )}
      </StyledForm>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1636955779321-819753cd1741?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const AvatarDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
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
  width: 80vw;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const StyledForm = styled.form`
  padding: 30px;
  background-image: url(${InvitationBackground});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px;
  border: white solid 1px;
  width: 80vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DivPartner = styled.div``;

const DivType = styled.div``;

const MediaDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
`;

const DivGenre = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const GenreInputs = styled.div`
  display: flex;
  justify-content: flex-start;
  // flex-direction: row;
  // gap: 20px
  // align-items: center;
`;

const DivLength = styled.div``;

const LengthInputs = styled.div`
display: flex;
flex-direction: row:
gap: 20px;
justify-content: space-between;`;

// const ProgressBar = styled.progress`
//   width: 80vw;
// `;

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
