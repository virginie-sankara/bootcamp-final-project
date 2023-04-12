import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Prata', serif;
    color: white;
    -webkit-font-smoothing: antialiased;
    
  
}

body {
  margin: 0;
}

h1 {
  
font-family: 'Shrikhand', cursive;
color: white;

}

h2 {
  font-size: 50px;
}
p {    
    line-height: 1.5;
    font-size: 15px;  
    font-family: 'Prata', serif;
}
button {
  background-color: transparent;
  font-family: 'Prata', serif;
  padding: 15px;
  border: white 1px solid;
  border-radius: 25px;
  color: white;
  text-align: center;
  &:hover {
    background-color: white;
    color: black;
    
  }

 
  
}




`;

export default GlobalStyle;
