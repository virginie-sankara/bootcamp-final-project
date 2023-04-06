import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

// import { Link } from "react-router-dom";

const Form2 = ({ userData }) => {
  const { matchId } = useParams();
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
          console.log("formData1 here");
          console.log(response.match);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return <p>{matchId}</p>;
};

export default Form2;
