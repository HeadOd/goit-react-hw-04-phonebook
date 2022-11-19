import { Global } from "@emotion/react";
import { GlobalStyled } from "./Global/Global.styled";

import { Container } from "./App.styled";
import { Phonebook } from "./Phonebook/Phonebook";

export const App = () => {
  return (
    <Container>
      <Global styles={GlobalStyled} />
      <Phonebook>
      </Phonebook>
    </Container>
  );
};
