import { useState, useEffect } from "react";
import styled from "styled-components";

import Input from "./Input";

const Form = (handleSubmit) => {
  const [formData, setFormData] = useState({});
  const [usersData, setUsersData] = useState([]);

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  //   GET : Users data
  useEffect(() => {});

  return (
    <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
      <label>
        Pick your partner :
        <select onChange={handleChange}>
          <option value="">Select a partner</option>
          {}
          <option value="lime">Lime</option>
          <option selected value="coconut">
            Coconut
          </option>
          <option value="mango">Mango</option>
        </select>
      </label>
      <Input
        type="text"
        placeholder="Partner"
        name={"partner"}
        required={true}
        handleChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Genre"
        name={"genre"}
        required={true}
        handleChange={handleChange}
      />
      <Input
        type="email"
        placeholder="Length"
        name={"length"}
        required={true}
        handleChange={handleChange}
      />
      <Input
        type="email"
        placeholder="Type"
        name={"type"}
        required={true}
        handleChange={handleChange}
      />
      <Submit type="submit">Confirm</Submit>
    </StyledForm>
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
