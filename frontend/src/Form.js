import { useState } from "react";
import styled from "styled-components";

import Input from "./Input";

const Form = (handleSubmit) => {
  const [formData, setFormData] = useState({});

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
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
